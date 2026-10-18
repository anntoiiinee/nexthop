"""Demande à NetBox de rendre le config template de chaque équipement, et enregistre le résultat
là où Arista AVD attend les configurations structurées.

    export NETBOX_URL=https://netbox.example.com
    export NETBOX_TOKEN=...
    python3 templates/netbox/fetch_structured_configs.py leaf1 leaf2

NetBox doit avoir un config template assigné à ces équipements (directement, par leur rôle ou par leur plateforme).
"""

import os
import sys
from pathlib import Path

import requests

OUTPUT = Path("intended/structured_configs")


def main(names: list[str]) -> int:
    url = os.environ.get("NETBOX_URL", "").rstrip("/")
    token = os.environ.get("NETBOX_TOKEN")
    if not url or not token:
        sys.exit("Définissez NETBOX_URL et NETBOX_TOKEN.")

    session = requests.Session()
    # Jetons v2 (NetBox 4.5 et plus) : « Bearer » ; anciens jetons : « Token »
    scheme = "Bearer" if token.startswith("nbt_") else "Token"
    session.headers.update({"Authorization": f"{scheme} {token}", "Accept": "application/json"})
    OUTPUT.mkdir(parents=True, exist_ok=True)

    errors = 0
    for name in names:
        found = session.get(f"{url}/api/dcim/devices/", params={"name": name}, timeout=10).json()
        if found.get("count") != 1:
            print(f"ERREUR {name} : équipement introuvable dans NetBox")
            errors += 1
            continue
        device_id = found["results"][0]["id"]

        # POST : NetBox rend le template avec l'équipement et son config context
        response = session.post(f"{url}/api/dcim/devices/{device_id}/render-config/", timeout=30)
        if not response.ok:
            print(f"ERREUR {name} : {response.status_code} {response.text[:200]}")
            errors += 1
            continue

        (OUTPUT / f"{name}.yml").write_text(response.json()["content"], encoding="utf-8")
        print(f"OK     {name} -> {OUTPUT / (name + '.yml')}")

    return 1 if errors else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1:]))
