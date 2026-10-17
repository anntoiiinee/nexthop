# VPN site à site vers le data center (optionnel, payant) : deux tunnels IPsec, chacun avec une session BGP.
# Côté AWS : une Virtual Private Gateway attachée au VPC. Côté data center : la Customer Gateway,
# qui décrit votre routeur (son IP publique et son AS).
resource "aws_vpn_gateway" "main" {
  count = var.enable_vpn ? 1 : 0

  vpc_id          = aws_vpc.main.id
  amazon_side_asn = 64512
  tags            = { Name = "${var.name}-vgw" }
}

resource "aws_customer_gateway" "dc" {
  count = var.enable_vpn ? 1 : 0

  bgp_asn    = var.onprem_asn
  ip_address = var.onprem_public_ip
  type       = "ipsec.1"
  tags       = { Name = "${var.name}-cgw-dc" }
}

resource "aws_vpn_connection" "dc" {
  count = var.enable_vpn ? 1 : 0

  vpn_gateway_id      = aws_vpn_gateway.main[0].id
  customer_gateway_id = aws_customer_gateway.dc[0].id
  type                = "ipsec.1"
  static_routes_only  = false # routage dynamique : BGP dans chaque tunnel
  tags                = { Name = "${var.name}-vpn-dc" }
}

# Les routes apprises en BGP depuis le data center sont injectées dans la table privée
resource "aws_vpn_gateway_route_propagation" "private" {
  count = var.enable_vpn ? 1 : 0

  vpn_gateway_id = aws_vpn_gateway.main[0].id
  route_table_id = aws_route_table.private.id
}
