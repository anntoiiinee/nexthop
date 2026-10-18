# Politique du script de rotation : écrire et relire les mots de passe de secours, rien d'autre.
path "secret/data/netops/breakglass/*" {
  capabilities = ["create", "update", "read"]
}
path "secret/metadata/netops/breakglass/*" {
  capabilities = ["read", "list"]
}
