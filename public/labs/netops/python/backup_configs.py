#!/usr/bin/env python3
"""Sauvegarde la running-config de chaque équipement dans backups/<nom>.cfg.

Le dossier backups/ est ensuite commité dans Git (voir gitlab-ci.yml) : chaque
changement de configuration devient un commit, avec son diff et sa date.

Usage : python3 python/backup_configs.py
Code de sortie : 0 si tout est sauvegardé, 1 si au moins un équipement a échoué
(les sauvegardes réussies sont tout de même écrites).
"""
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

from netmiko import ConnectHandler
from netmiko.exceptions import NetmikoAuthenticationException, NetmikoTimeoutException

from netops import LAB_DIR, credentials, device, load_inventory

BACKUP_DIR = LAB_DIR / "backups"

# Lignes qui changent sans que la configuration change : on les retire pour garder
# des diffs propres (en-têtes d'EOS, horodatage « Last configuration change » de Cisco…).
NOISE = re.compile(r"^(! (Command|Time|device):.*|! Last configuration change.*|! NVRAM config last updated.*)\n", re.M)


def backup(name: str, host: str, user: str, password: str) -> None:
    with ConnectHandler(**device(host, user, password)) as conn:
        config = conn.send_command("show running-config")
    (BACKUP_DIR / f"{name}.cfg").write_text(NOISE.sub("", config).strip() + "\n")


def main() -> None:
    user, password = credentials()
    inventory = load_inventory()
    BACKUP_DIR.mkdir(exist_ok=True)

    failures = []
    with ThreadPoolExecutor(max_workers=10) as pool:
        jobs = {pool.submit(backup, name, host, user, password): name for name, host in inventory.items()}
        for job in as_completed(jobs):
            name = jobs[job]
            try:
                job.result()
                print(f"OK    {name}")
            except (NetmikoAuthenticationException, NetmikoTimeoutException, OSError) as exc:
                failures.append(name)
                print(f"ÉCHEC {name} : {exc}", file=sys.stderr)

    print(f"{len(inventory) - len(failures)}/{len(inventory)} équipements sauvegardés dans {BACKUP_DIR.name}/")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
