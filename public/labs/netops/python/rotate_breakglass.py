#!/usr/bin/env python3
"""Rotation du compte local de secours (break-glass) sur tous les équipements.

Pour chaque équipement, dans cet ordre pour ne jamais se retrouver enfermé dehors :
  1. générer un mot de passe aléatoire et unique ;
  2. l'écrire dans HashiCorp Vault avec le statut « pending », AVANT de toucher à l'équipement ;
  3. l'appliquer sur l'équipement ;
  4. vérifier qu'on se connecte avec, par une connexion indépendante ;
  5. (option) supprimer le compte « admin » par défaut ;
  6. enregistrer la configuration, puis passer le secret au statut « active ».

Chaque équipement a son secret dans le moteur KV v2 : secret/netops/breakglass/<équipement>.
Vault garde les versions précédentes : si la rotation échoue, l'ancien mot de passe reste lisible
(vault kv get -version=<n> …).

Prérequis :
  NET_USER / NET_PASSWORD             compte de service utilisé pour se connecter aux équipements
  VAULT_ADDR                          adresse de Vault, par exemple http://172.20.30.70:8200
  VAULT_TOKEN                         jeton Vault…
  ou VAULT_ROLE_ID / VAULT_SECRET_ID  …ou identité AppRole (pipeline)

Usage : python3 python/rotate_breakglass.py [--remove-default-admin]
"""
import argparse
import secrets
import string
import sys

from netmiko import ConnectHandler

from netops import credentials, device, load_inventory
from vault_client import VaultClient, VaultError

BREAKGLASS_USER = "nh-breakglass"  # choisissez un nom propre à votre entreprise, pas « admin »
VAULT_MOUNT = "secret"             # moteur KV v2
VAULT_PATH = "netops/breakglass"   # un secret par équipement sous ce chemin
# Lettres, chiffres et quelques symboles sans danger pour la CLI (« ? » y déclenche l'aide)
ALPHABET = string.ascii_letters + string.digits + "-_.+="


def store(vault: VaultClient, name: str, password: str, status: str) -> int:
    """Écrit une nouvelle version du secret de l'équipement et renvoie son numéro de version."""
    return vault.put(f"{VAULT_PATH}/{name}", {"username": BREAKGLASS_USER, "password": password, "status": status})


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
    try:
        vault = VaultClient.from_env(VAULT_MOUNT)
    except VaultError as exc:
        sys.exit(str(exc))

    # En série, pas en parallèle : au premier problème, on s'arrête avant de toucher aux autres
    for name, host in inventory.items():
        new_pw = new_password()
        version = store(vault, name, new_pw, "pending")  # au coffre AVANT d'appliquer
        try:
            rotate(host, user, password, new_pw, args.remove_default_admin)
        except Exception as exc:  # noqa: BLE001 - on veut s'arrêter quelle que soit l'erreur
            print(f"ÉCHEC {name} : {exc}", file=sys.stderr)
            previous = f" (version {version - 1})" if version > 1 else ""
            sys.exit(
                f"Rotation interrompue sur {name}. Son nouveau mot de passe est la version {version} "
                f"de {VAULT_MOUNT}/{VAULT_PATH}/{name} (statut pending) : il a peut-être été appliqué. "
                f"Sinon, l'équipement a gardé l'ancien{previous}. "
                "Les équipements suivants n'ont pas été modifiés."
            )
        version = store(vault, name, new_pw, "active")
        print(f"OK    {name}  (version {version})")

    print(f"Rotation terminée : les mots de passe sont dans Vault, sous {VAULT_MOUNT}/{VAULT_PATH}/.")


if __name__ == "__main__":
    main()
