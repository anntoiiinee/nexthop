variable "region" {
  description = "Région AWS (eu-west-3 = Paris)"
  type        = string
  default     = "eu-west-3"
}

variable "name" {
  description = "Préfixe des noms de ressources"
  type        = string
  default     = "nexthop"
}

variable "vpc_cidr" {
  description = "Bloc d'adresses du VPC : il ne doit chevaucher ni le data center ni les autres VPC"
  type        = string
  default     = "10.50.0.0/16"
}

# Un sous-réseau par zone de disponibilité : la clé est la lettre de la zone (eu-west-3a, eu-west-3b)
variable "public_subnets" {
  description = "Sous-réseaux publics (route par défaut vers l'Internet Gateway)"
  type        = map(string)
  default = {
    a = "10.50.0.0/24"
    b = "10.50.1.0/24"
  }
}

variable "private_subnets" {
  description = "Sous-réseaux privés (pas d'accès direct depuis Internet)"
  type        = map(string)
  default = {
    a = "10.50.10.0/24"
    b = "10.50.11.0/24"
  }
}

# Les options payantes sont désactivées par défaut : on les active le temps d'un exercice,
# puis on les désactive (ou terraform destroy).
variable "enable_nat_gateway" {
  description = "NAT Gateway pour la sortie Internet des sous-réseaux privés (facturée à l'heure et au Go)"
  type        = bool
  default     = false
}

variable "enable_flow_logs" {
  description = "VPC Flow Logs vers CloudWatch Logs (facturé au volume de journaux)"
  type        = bool
  default     = false
}

variable "enable_vpn" {
  description = "VPN site à site vers le data center (facturé à l'heure par connexion)"
  type        = bool
  default     = false
}

variable "onprem_public_ip" {
  description = "Adresse IP publique du routeur VPN du data center"
  type        = string
  default     = "203.0.113.10"
}

variable "onprem_asn" {
  description = "Numéro d'AS BGP du data center"
  type        = number
  default     = 65001
}
