#!/bin/sh
# PKI du lab proxy-lb (chapitre « TLS, certificats et inspection »).
# Crée une autorité racine, deux autorités intermédiaires et deux certificats serveur :
#   Issuing CA                               signe les certificats serveur
#   Inspection CA                            utilisée par Squid pour l'inspection TLS
#   app.example.com (+ admin.example.com)    pour HAProxy (lb)
#   www.example.com (+ games.example.net, bank.example.org)   pour le site « Internet »
# Usage, depuis le dossier du lab : sh pki/make-pki.sh
set -eu
cd "$(dirname "$0")"
mkdir -p out
cd out

if [ -f ca.crt ]; then
  echo "La PKI existe déjà (pki/out). Pour la recréer : détruire le lab, supprimer pki/out,"
  echo "relancer ce script, puis redéployer (les conteneurs gardent l'ancien dossier monté)."
  exit 0
fi

# 1. Autorité racine : 10 ans, elle ne signe que les intermédiaires.
#    En entreprise, sa clé reste hors ligne, dans un coffre.
openssl req -x509 -new -newkey rsa:4096 -nodes -sha256 -days 3650 \
  -keyout root-ca.key -out ca.crt \
  -subj "/O=Next Hop Lab/CN=Next Hop Lab Root CA" \
  -addext "basicConstraints=critical,CA:TRUE" \
  -addext "keyUsage=critical,keyCertSign,cRLSign"

# 2. Autorités intermédiaires : 5 ans, signées par la racine, elles ne peuvent signer
#    que des certificats finaux (pathlen:0).
intermediate() {
  name=$1; cn=$2
  openssl req -new -newkey rsa:3072 -nodes -sha256 \
    -keyout "$name.key" -out "$name.csr" -subj "/O=Next Hop Lab/CN=$cn"
  openssl x509 -req -in "$name.csr" -sha256 -days 1825 \
    -CA ca.crt -CAkey root-ca.key -CAcreateserial -out "$name.crt" \
    -extfile /dev/stdin <<EXT
basicConstraints=critical,CA:TRUE,pathlen:0
keyUsage=critical,keyCertSign,cRLSign
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid
EXT
}

intermediate issuing-ca "Next Hop Lab Issuing CA"
intermediate inspection-ca "Next Hop Lab Inspection CA"

# 3. Certificats serveur : 200 jours (la durée maximale des autorités publiques depuis mars 2026),
#    un nom principal et des noms alternatifs (SAN), les seuls que les navigateurs vérifient.
issue() {
  name=$1; san=$2
  openssl req -new -newkey rsa:2048 -nodes -sha256 \
    -keyout "$name.key" -out "$name.csr" -subj "/O=Next Hop Lab/CN=$name"
  openssl x509 -req -in "$name.csr" -sha256 -days 200 \
    -CA issuing-ca.crt -CAkey issuing-ca.key -CAcreateserial -out "$name.crt" \
    -extfile /dev/stdin <<EXT
basicConstraints=critical,CA:FALSE
keyUsage=critical,digitalSignature,keyEncipherment
extendedKeyUsage=serverAuth
subjectAltName=$san
subjectKeyIdentifier=hash
authorityKeyIdentifier=keyid
EXT
  # Ce que le serveur envoie : son certificat, puis l'intermédiaire (jamais la racine)
  cat "$name.crt" issuing-ca.crt > "$name.fullchain.crt"
}

issue app.example.com "DNS:app.example.com,DNS:admin.example.com"
issue www.example.com "DNS:www.example.com,DNS:games.example.net,DNS:bank.example.org"

# HAProxy attend un seul fichier : certificat, intermédiaire, puis clé privée
cat app.example.com.fullchain.crt app.example.com.key > app.example.com.pem
# Squid aussi : certificat de l'autorité d'inspection, puis sa clé
cat inspection-ca.crt inspection-ca.key > inspection-ca.pem

rm -f ./*.csr ./*.srl
# Les conteneurs lisent les clés avec un autre utilisateur que le vôtre
chmod 644 ./*.key ./*.pem
echo "PKI créée dans pki/out. Autorité à faire confiance : pki/out/ca.crt"
