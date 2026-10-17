# Versions de Terraform et du fournisseur AWS : on les épingle pour que le code se comporte
# de la même façon chez tout le monde (et dans le pipeline).
terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # En équipe, l'état se stocke à distance (voir le chapitre Terraform) :
  # backend "s3" {
  #   bucket       = "mon-entreprise-tfstate"
  #   key          = "reseau/cloud-aws.tfstate"
  #   region       = "eu-west-3"
  #   use_lockfile = true
  # }
}

provider "aws" {
  region = var.region

  # Étiquettes ajoutées à toutes les ressources : on retrouve d'un coup d'œil ce qui vient du lab
  default_tags {
    tags = {
      Project   = "nexthop-lab"
      ManagedBy = "terraform"
    }
  }
}
