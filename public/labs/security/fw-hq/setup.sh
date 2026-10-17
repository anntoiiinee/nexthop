#!/bin/sh
# fw-hq : firewall du siège. Lancé par ContainerLab au déploiement (exec).
#   eth1 outside 203.0.113.2/30   eth2 users 10.10.10.1/24
#   eth3 servers 10.10.20.1/24    eth4 dmz   172.16.30.1/24
#   ipsec0 : tunnel IPsec vers l'agence (interface VTI, clé 42)
set -e

# 1. Paquets (par le réseau de management, avant de changer la route par défaut)
apk add -q --no-cache nftables conntrack-tools strongswan iproute2 tcpdump

# 2. Interfaces et routage
ip addr add 203.0.113.2/30 dev eth1
ip addr add 10.10.10.1/24 dev eth2
ip addr add 10.10.20.1/24 dev eth3
ip addr add 172.16.30.1/24 dev eth4
ip route replace default via 203.0.113.1

# 3. Interface du tunnel IPsec : le routage décide de ce qui part dans le tunnel
ip link add ipsec0 type vti local 203.0.113.2 remote 198.51.100.2 key 42
sysctl -qw net.ipv4.conf.ipsec0.disable_policy=1
ip addr add 169.254.42.1/30 dev ipsec0
ip link set ipsec0 up
ip route add 10.20.0.0/16 dev ipsec0

# 4. Politique de filtrage et NAT
nft -f /lab/nftables.nft

# 5. IPsec : charon (le démon IKE) puis la configuration swanctl
sed -i 's/^\(\s*\)# install_routes = yes/\1install_routes = no/' /etc/strongswan.d/charon.conf
/usr/lib/strongswan/charon >/var/log/charon.log 2>&1 &
sleep 2
ln -sf /lab/swanctl.conf /etc/swanctl/swanctl.conf
swanctl --load-all
