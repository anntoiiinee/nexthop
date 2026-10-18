# Politique des ingénieurs : lire un mot de passe de secours et son historique, sans pouvoir le modifier.
path "secret/data/netops/breakglass/*" {
  capabilities = ["read"]
}
path "secret/metadata/netops/breakglass/*" {
  capabilities = ["read", "list"]
}
