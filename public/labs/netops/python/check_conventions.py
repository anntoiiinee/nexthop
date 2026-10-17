#!/usr/bin/env python3
"""Vérifie que des configurations Arista EOS respectent conventions.yml.

Le contrôle se fait hors ligne, sur des fichiers .cfg : les sauvegardes du chapitre
« Sauvegardes GitOps » (backups/) ou les configurations de démarrage du lab (configs/).
Pas besoin de joindre les équipements, il peut donc tourner dans la CI.

Usage : python3 python/check_conventions.py [dossier]   (par défaut : backups/)
Code de sortie : 0 si tout est conforme, 1 s'il reste au moins un écart.
"""
import ipaddress
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from netops import LAB_DIR


@dataclass
class Interface:
    name: str
    description: str | None = None
    address: ipaddress.IPv4Interface | None = None
    shutdown: bool = False


@dataclass
class Device:
    hostname: str
    interfaces: dict[str, Interface] = field(default_factory=dict)
    vlans: list[str] = field(default_factory=list)
    vrfs: list[str] = field(default_factory=list)
    route_maps: set[str] = field(default_factory=set)
    prefix_lists: set[str] = field(default_factory=set)


def parse(text: str) -> Device:
    """Lit une configuration EOS : un bloc commence en colonne 0, ses lignes sont indentées."""
    device = Device(hostname="?")
    block, itf = "", None
    for line in text.splitlines():
        if not line.strip() or line.strip() == "!":
            continue
        if not line.startswith(" "):
            block, itf = line, None
            if m := re.match(r"hostname (\S+)", line):
                device.hostname = m[1]
            elif m := re.match(r"interface (\S+)", line):
                itf = device.interfaces.setdefault(m[1], Interface(m[1]))
            elif m := re.match(r"vrf instance (\S+)", line):
                device.vrfs.append(m[1])
            elif m := re.match(r"route-map (\S+)", line):
                device.route_maps.add(m[1])
            elif m := re.match(r"ip prefix-list (\S+)", line):
                device.prefix_lists.add(m[1])
            continue
        child = line.strip()
        if itf:
            if child.startswith("description "):
                itf.description = child.removeprefix("description ")
            elif m := re.match(r"ip address (\S+/\d+)$", child):
                itf.address = ipaddress.IPv4Interface(m[1])
            elif child == "shutdown":
                itf.shutdown = True
        elif block.startswith("vlan ") and (m := re.match(r"name (\S+)$", child)):
            device.vlans.append(m[1])
    return device


# Bloc d'adresses attendu selon le type d'interface, et longueur de préfixe imposée
ADDRESS_RULES = {
    "Management": ("management", None),
    "Loopback0": ("loopbacks", 32),
    "Loopback1": ("vteps", 32),
    "Ethernet": ("p2p", 31),
}


def check(devices: dict[str, Device], conv: dict) -> list[str]:
    naming, addressing = conv["naming"], conv["addressing"]
    blocks = {k: ipaddress.IPv4Network(v) for k, v in addressing.items()}
    allowed = {e["name"] for e in conv.get("exceptions", {}).get("hostname", [])}
    desc_re = re.compile(naming["interface_description"])
    issues = []

    def name_rule(dev: Device, kind: str, names, rule: str) -> None:
        for name in names:
            if not re.match(naming[rule], name):
                issues.append(f"{dev.hostname:<16} {kind} « {name} » ne suit pas {naming[rule]}")

    for dev in devices.values():
        if dev.hostname not in allowed and not re.match(naming["hostname"], dev.hostname):
            issues.append(f"{dev.hostname:<16} nom d'équipement non conforme (attendu : {naming['hostname']})")
        name_rule(dev, "VLAN", dev.vlans, "vlan")
        name_rule(dev, "VRF", dev.vrfs, "vrf")
        name_rule(dev, "route-map", sorted(dev.route_maps), "route_map")
        name_rule(dev, "prefix-list", sorted(dev.prefix_lists), "prefix_list")

        for itf in dev.interfaces.values():
            where = f"{dev.hostname:<16} {itf.name}"

            # Adressage : chaque type d'interface puise dans son bloc
            if itf.address:
                ip, net = itf.address.ip, itf.address.network
                for prefix, (block, length) in ADDRESS_RULES.items():
                    if itf.name.startswith(prefix):
                        if ip not in blocks[block]:
                            issues.append(f"{where} : {itf.address} hors du bloc {block} ({blocks[block]})")
                        elif length and net.prefixlen != length:
                            issues.append(f"{where} : /{net.prefixlen} au lieu de /{length} attendu pour {block}")
                        break

            # Description : obligatoire et parsable sur tout port Ethernet actif
            if not itf.name.startswith("Ethernet") or itf.shutdown:
                continue
            if not itf.description:
                issues.append(f"{where} : port actif sans description (un port inutilisé doit être shutdown)")
                continue
            m = desc_re.match(itf.description)
            if not m:
                issues.append(f"{where} : description « {itf.description} » non conforme (attendu : vers:<voisin>:<interface>)")
                continue

            # Cohérence avec le voisin, quand on a aussi sa configuration
            peer = devices.get(m["peer"])
            if not peer:
                continue
            back = peer.interfaces.get(m["port"])
            if not back:
                issues.append(f"{where} : {m['peer']} n'a pas d'interface {m['port']}")
            elif back.description != f"vers:{dev.hostname}:{itf.name}":
                issues.append(f"{where} : {m['peer']} {m['port']} ne pointe pas en retour (« {back.description} »)")
            elif itf.address and back.address and itf.address.network != back.address.network:
                issues.append(f"{where} : {itf.address} et {back.address} ({m['peer']}) ne sont pas dans le même sous-réseau")
    return issues


def main() -> None:
    folder = Path(sys.argv[1]) if len(sys.argv) > 1 else LAB_DIR / "backups"
    files = sorted(folder.glob("*.cfg"))
    if not files:
        sys.exit(f"Aucun fichier .cfg dans {folder}/")

    conv = yaml.safe_load((LAB_DIR / "conventions.yml").read_text())
    devices = {d.hostname: d for d in (parse(f.read_text()) for f in files)}
    issues = check(devices, conv)

    for issue in issues:
        print(issue)
    print(f"{len(issues)} écart(s) sur {len(devices)} équipement(s) contrôlé(s) dans {folder.name}/")
    sys.exit(1 if issues else 0)


if __name__ == "__main__":
    main()
