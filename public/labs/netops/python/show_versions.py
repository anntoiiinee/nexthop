#!/usr/bin/env python3
"""Affiche le modèle et la version EOS de chaque équipement, en parallèle.

Usage : python3 python/show_versions.py
"""
import json
from concurrent.futures import ThreadPoolExecutor

from netmiko import ConnectHandler

from netops import credentials, device, load_inventory


def get_version(name: str, host: str, user: str, password: str) -> tuple[str, str, str]:
    with ConnectHandler(**device(host, user, password)) as conn:
        # EOS sait répondre en JSON : pas besoin de « parser » du texte
        data = json.loads(conn.send_command("show version | json"))
    return name, data["modelName"], data["version"]


def main() -> None:
    user, password = credentials()
    inventory = load_inventory()

    with ThreadPoolExecutor(max_workers=10) as pool:
        jobs = [pool.submit(get_version, name, host, user, password) for name, host in inventory.items()]
        for job in jobs:
            name, model, version = job.result()
            print(f"{name:<8} {model:<12} {version}")


if __name__ == "__main__":
    main()
