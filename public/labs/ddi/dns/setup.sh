#!/bin/sh
# dns : serveur BIND, à la fois faisant autorité pour corp.example.com et résolveur pour le site.
set -e
apk add -q --no-cache bind bind-tools
ip addr add 10.20.99.53/24 dev eth1
ip route replace default via 10.20.99.1
# Les zones doivent être modifiables par BIND (mises à jour dynamiques) : on les copie hors du montage
mkdir -p /var/bind/dyn
cp /lab/db.corp.example.com /lab/db.10.20.10 /var/bind/dyn/
chown -R named:named /var/bind/dyn
named -c /lab/named.conf -u named
