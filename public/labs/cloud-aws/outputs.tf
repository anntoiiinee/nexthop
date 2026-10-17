output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = { for k, s in aws_subnet.public : k => s.id }
}

output "private_subnet_ids" {
  value = { for k, s in aws_subnet.private : k => s.id }
}

output "security_groups" {
  value = { web = aws_security_group.web.id, app = aws_security_group.app.id }
}

output "nat_public_ip" {
  description = "Adresse publique de sortie des sous-réseaux privés (si la NAT Gateway est activée)"
  value       = var.enable_nat_gateway ? aws_eip.nat[0].public_ip : null
}

# Ce qu'il faut configurer côté data center pour monter les deux tunnels
output "vpn_tunnels" {
  value = var.enable_vpn ? {
    tunnel1 = {
      aws_public_ip    = aws_vpn_connection.dc[0].tunnel1_address
      aws_inside_ip    = aws_vpn_connection.dc[0].tunnel1_vgw_inside_address
      onprem_inside_ip = aws_vpn_connection.dc[0].tunnel1_cgw_inside_address
    }
    tunnel2 = {
      aws_public_ip    = aws_vpn_connection.dc[0].tunnel2_address
      aws_inside_ip    = aws_vpn_connection.dc[0].tunnel2_vgw_inside_address
      onprem_inside_ip = aws_vpn_connection.dc[0].tunnel2_cgw_inside_address
    }
  } : null
}

output "vpn_preshared_keys" {
  description = "Clés pré-partagées des tunnels : terraform output -json vpn_preshared_keys"
  sensitive   = true
  value       = var.enable_vpn ? [aws_vpn_connection.dc[0].tunnel1_preshared_key, aws_vpn_connection.dc[0].tunnel2_preshared_key] : null
}
