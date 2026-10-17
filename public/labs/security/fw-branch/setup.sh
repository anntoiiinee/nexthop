#!/bin/sh
# fw-branch : firewall de l'agence. Lancé par ContainerLab au déploiement (exec).
#   eth1 outside 198.51.100.2/30   eth2 users 10.20.10.1/24
#   ipsec0 : tunnel IPsec vers le siège (interface VTI, clé 42)
set -e

apk add -q --no-cache nftables conntrack-tools strongswan iproute2 tcpdump

ip addr add 198.51.100.2/30 dev eth1
ip addr add 10.20.10.1/24 dev eth2
ip route replace default via 198.51.100.1

ip link add ipsec0 type vti local 198.51.100.2 remote 203.0.113.2 key 42
sysctl -qw net.ipv4.conf.ipsec0.disable_policy=1
ip addr add 169.254.42.2/30 dev ipsec0
ip link set ipsec0 up
ip route add 10.10.0.0/16 dev ipsec0

nft -f /lab/nftables.nft

sed -i 's/^\(\s*\)# install_routes = yes/\1install_routes = no/' /etc/strongswan.d/charon.conf
/usr/lib/strongswan/charon >/var/log/charon.log 2>&1 &
sleep 2
ln -sf /lab/swanctl.conf /etc/swanctl/swanctl.conf
swanctl --load-all
