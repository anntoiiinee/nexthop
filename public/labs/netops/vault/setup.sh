#!/bin/sh
# Configuration du Vault du lab, lancée par ContainerLab au démarrage du conteneur « vault ».
# Mode dev : Vault tourne en mémoire, déjà déverrouillé, avec un jeton root connu. Tout est perdu à
# l'arrêt du conteneur. Pratique pour apprendre, à ne JAMAIS utiliser en production.
set -e
export VAULT_ADDR=http://127.0.0.1:8200 VAULT_TOKEN=netops-root

until vault status >/dev/null 2>&1; do sleep 1; done

# Journal d'audit : chaque lecture et chaque écriture de secret, avec l'identité de l'appelant
vault audit enable file file_path=/vault/logs/audit.log

# Le moteur KV v2 est déjà monté sur secret/ en mode dev. On garde 10 versions de chaque secret.
vault write secret/config max_versions=10

# Politiques : le script de rotation écrit, les ingénieurs lisent
vault policy write netops-rotation /vault-setup/netops-rotation.hcl
vault policy write netops-breakglass-read /vault-setup/netops-breakglass-read.hcl

# AppRole : l'identité du script de rotation (dans un pipeline, un role_id et un secret_id)
vault auth enable approle
vault write auth/approle/role/netops-rotation token_policies=netops-rotation token_ttl=15m token_max_ttl=30m

# Un compte d'ingénieur, en lecture seule sur les mots de passe de secours
vault auth enable userpass
vault write auth/userpass/users/alice password=alice-lab token_policies=netops-breakglass-read

echo "Vault du lab prêt : http://172.20.30.70:8200 (jeton root : netops-root)"
