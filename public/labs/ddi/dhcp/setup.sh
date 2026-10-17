#!/bin/sh
# dhcp : serveur Kea (DHCPv4) et son module de mise à jour DNS (kea-dhcp-ddns).
set -e
apk add -q --no-cache kea-dhcp4 kea-dhcp-ddns
ip addr add 10.20.99.10/24 dev eth1
ip route replace default via 10.20.99.1
mkdir -p /run/kea /var/lib/kea
kea-dhcp-ddns -c /lab/kea-dhcp-ddns.conf >/var/log/kea-ddns.log 2>&1 &
kea-dhcp4 -c /lab/kea-dhcp4.conf >/var/log/kea-dhcp4.log 2>&1 &
