#!/usr/bin/env python3
"""Le cycle complet d'une API REST, sur NetBox : lire, créer, modifier, remplacer, supprimer.

Chaque étape affiche la méthode HTTP, l'URL et le code de retour, pour voir ce qui circule.
Le script crée un VLAN de test, le modifie, puis le supprime : il laisse NetBox dans l'état où il l'a trouvé.

Prérequis :
  NETBOX_URL     par exemple https://demo.netbox.dev
  NETBOX_TOKEN   jeton d'API (nbt_<clé>.<secret> depuis NetBox 4.5, ou ancien jeton de 40 caractères)

Usage : python3 python/netbox_api.py [--site dm-akron] [--vid 3999]
"""
import argparse
import os
import sys

import requests


def session_from_env() -> tuple[requests.Session, str]:
    url, token = os.environ.get("NETBOX_URL"), os.environ.get("NETBOX_TOKEN")
    if not url or not token:
        sys.exit("Définissez NETBOX_URL et NETBOX_TOKEN.")
    session = requests.Session()
    # Jetons v2 (NetBox 4.5 et plus) : « Bearer » ; anciens jetons : « Token »
    scheme = "Bearer" if token.startswith("nbt_") else "Token"
    session.headers.update({
        "Authorization": f"{scheme} {token}",
        "Accept": "application/json",        # ce que l'on veut recevoir
        "Content-Type": "application/json",  # ce que l'on envoie
    })
    return session, url.rstrip("/") + "/api"


def call(session: requests.Session, method: str, url: str, **kwargs) -> requests.Response:
    """Envoie la requête et affiche une ligne de résumé : méthode, chemin, code de retour."""
    response = session.request(method, url, timeout=10, **kwargs)
    path = url.split("/api", 1)[-1]
    print(f"{method:<6} /api{path:<45} {response.status_code} {response.reason}")
    return response


def main() -> None:
    parser = argparse.ArgumentParser(description="Démonstration des méthodes HTTP sur l'API NetBox.")
    parser.add_argument("--site", default="dm-akron", help="slug du site où créer le VLAN de test")
    parser.add_argument("--vid", type=int, default=3999, help="numéro du VLAN de test")
    args = parser.parse_args()
    session, api = session_from_env()

    # GET : une liste filtrée et paginée
    r = call(session, "GET", f"{api}/dcim/devices/", params={"site": args.site, "limit": 5})
    r.raise_for_status()
    page = r.json()
    print(f"       {page['count']} équipements sur le site {args.site} :",
          ", ".join(d["name"] or f"(sans nom, id {d['id']})" for d in page["results"]))

    # GET : un objet précis, pour récupérer l'identifiant du site
    r = call(session, "GET", f"{api}/dcim/sites/", params={"slug": args.site})
    site = r.json()["results"][0]

    # POST : créer
    r = call(session, "POST", f"{api}/ipam/vlans/",
             json={"vid": args.vid, "name": "nexthop-api-demo", "status": "active", "site": site["id"]})
    if r.status_code != 201:
        sys.exit(f"Création refusée : {r.json()}")
    vlan = r.json()
    url = vlan["url"]  # l'adresse de l'objet créé, renvoyée par NetBox
    print(f"       créé : id {vlan['id']}, {vlan['display']}")

    try:
        # POST invalide : NetBox explique ce qui ne va pas
        r = call(session, "POST", f"{api}/ipam/vlans/", json={"vid": 5000, "name": "trop-grand"})
        print(f"       {r.json()}")

        # PATCH : modifier un seul champ
        r = call(session, "PATCH", url, json={"description": "VLAN de test du chapitre API"})
        print(f"       description : {r.json()['description']!r}")

        # PUT : envoyer l'objet entier (ici, sans les champs obligatoires : refusé)
        r = call(session, "PUT", url, json={"description": "remplacée"})
        print(f"       {r.json()}")
        r = call(session, "PUT", url, json={"vid": args.vid, "name": "nexthop-api-demo-v2", "status": "reserved"})
        updated = r.json()
        print(f"       {updated['name']}, statut {updated['status']['value']}, "
              f"site {updated['site']['name'] if updated['site'] else None}, description {updated['description']!r}")
    finally:
        # DELETE : supprimer, même si une étape précédente a échoué
        call(session, "DELETE", url)
        r = call(session, "GET", url)
        print(f"       {r.json()}")


if __name__ == "__main__":
    main()
