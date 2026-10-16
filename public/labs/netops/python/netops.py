"""Fonctions communes aux scripts du lab : inventaire, identifiants, connexion."""
import os
import sys
from pathlib import Path

import yaml

LAB_DIR = Path(__file__).resolve().parent.parent


def load_inventory(group: str = "eos") -> dict[str, str]:
    """Lit inventory.yml (le même que celui d'Ansible) : {nom: adresse de management}."""
    data = yaml.safe_load((LAB_DIR / "inventory.yml").read_text())
    hosts = data["all"]["children"][group]["hosts"]
    return {name: params["ansible_host"] for name, params in hosts.items()}


def credentials() -> tuple[str, str]:
    """Identifiants du compte de service, lus dans l'environnement (jamais dans le code)."""
    user, password = os.environ.get("NET_USER"), os.environ.get("NET_PASSWORD")
    if not user or not password:
        sys.exit("Définissez NET_USER et NET_PASSWORD avant de lancer le script.")
    return user, password


def device(host: str, user: str, password: str) -> dict:
    """Paramètres de connexion Netmiko pour un équipement Arista EOS."""
    return {"device_type": "arista_eos", "host": host, "username": user, "password": password}
