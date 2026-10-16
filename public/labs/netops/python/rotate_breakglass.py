#!/usr/bin/env python3
"""Rotation du compte local de secours (break-glass) sur tous les équipements.

Étapes, dans cet ordre pour ne jamais se retrouver enfermé dehors :
  1. générer un mot de passe aléatoire et unique par équipement ;
  2. l'écrire, chiffré, dans le coffre « en attente » (vault/breakglass.pending.yml),
     AVANT de toucher aux équipements ;
  3. l'appliquer sur l'équipement ;
  4. vérifier qu'on se connecte avec, par une connexion indépendante ;
  5. (option) supprimer le compte « admin » par défaut ;
  6. si tout a réussi, le coffre en attente devient le coffre courant (vault/breakglass.yml).

Le coffre est au format Ansible Vault : lisible avec « ansible-vault view vault/breakglass.yml »
et utilisable tel quel par les playbooks.

Prérequis :
  NET_USER / NET_PASSWORD        compte de service utilisé pour se connecter
  ANSIBLE_VAULT_PASSWORD_FILE    fichier contenant le mot de passe du coffre

Usage : python3 python/rotate_breakglass.py [--remove-default-admin]
"""
import argparse
import os
import secrets
import string
import sys
from pathlib import Path

import yaml
from ansible.parsing.vault import VaultLib, VaultSecret
from netmiko import ConnectHandler

from netops import LAB_DIR, credentials, device, load_inventory

BREAKGLASS_USER = "nh-breakglass"  # choisissez un nom propre à votre entreprise, pas « admin »
VAULT_DIR = LAB_DIR / "vault"
# Lettres, chiffres et quelques symboles sans danger pour la CLI (« ? » y déclenche l'aide)
ALPHABET = string.ascii_letters + string.digits + "-_.+="


def open_vault() -> VaultLib:
    path = os.environ.get("ANSIBLE_VAULT_PASSWORD_FILE")
    if not path:
        sys.exit("Définissez ANSIBLE_VAULT_PASSWORD_FILE (fichier contenant le mot de passe du coffre).")
    secret = Path(path).expanduser().read_bytes().strip()
    return VaultLib([("default", VaultSecret(secret))])


def write_vault(vault: VaultLib, path: Path, data: dict) -> None:
    """Chiffre en mémoire puis écrit : le mot de passe ne touche jamais le disque en clair."""
    path.parent.mkdir(exist_ok=True)
    path.write_bytes(vault.encrypt(yaml.safe_dump(data, sort_keys=False)))
    path.chmod(0o600)


def new_password(length: int = 32) -> str:
    return "".join(secrets.choice(ALPHABET) for _ in range(length))


def rotate(host: str, user: str, password: str, new_pw: str, remove_admin: bool) -> None:
    with ConnectHandler(**device(host, user, password)) as conn:
        conn.send_config_set([f"username {BREAKGLASS_USER} privilege 15 role network-admin secret {new_pw}"])

        # Vérification par une seconde connexion, avec le nouveau mot de passe
        with ConnectHandler(**device(host, BREAKGLASS_USER, new_pw)) as check:
            if "15" not in check.send_command("show privilege"):
                raise RuntimeError("le compte de secours n'a pas le niveau de privilège 15")

        if remove_admin:
            conn.send_config_set(["no username admin"])
        conn.save_config()


def main() -> None:
    parser = argparse.ArgumentParser(description="Rotation du compte local de secours.")
    parser.add_argument(
        "--remove-default-admin",
        action="store_true",
        help="supprimer le compte admin par défaut, une fois le compte de secours vérifié",
    )
    args = parser.parse_args()

    user, password = credentials()
    inventory = load_inventory()
    vault = open_vault()

    passwords = {name: new_password() for name in inventory}
    pending = VAULT_DIR / "breakglass.pending.yml"
    write_vault(vault, pending, {"breakglass_user": BREAKGLASS_USER, "breakglass_passwords": passwords})
    print(f"Nouveaux mots de passe enregistrés (chiffrés) dans {pending.relative_to(LAB_DIR)}")

    # En série, pas en parallèle : au premier problème, on s'arrête avant de toucher aux autres
    for name, host in inventory.items():
        try:
            rotate(host, user, password, passwords[name], args.remove_default_admin)
            print(f"OK    {name}")
        except Exception as exc:  # noqa: BLE001 - on veut s'arrêter quelle que soit l'erreur
            print(f"ÉCHEC {name} : {exc}", file=sys.stderr)
            sys.exit(
                f"Rotation interrompue. {pending.name} contient les nouveaux mots de passe des équipements "
                "déjà traités ; les autres ont gardé l'ancien (vault/breakglass.yml)."
            )

    pending.replace(VAULT_DIR / "breakglass.yml")
    print("Rotation terminée : vault/breakglass.yml est à jour.")


if __name__ == "__main__":
    main()
