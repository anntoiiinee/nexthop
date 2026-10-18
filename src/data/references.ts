// Documentation officielle citée en bas des chapitres et des tutoriels : normes (RFC, IEEE, NIST)
// et documentations des constructeurs et des projets. Une seule liste par page, commune au FR et à l'EN :
// les titres sont ceux des documents, en anglais.
// Clé : "courses/<formation>/<chapitre>" ou "tutorials/<slug>".
// Chaque URL est vérifiée avant publication : ne pas ajouter de lien sans l'avoir ouvert.

export interface Reference {
  title: string;
  url: string;
  source: string; // éditeur affiché en étiquette : IETF, IEEE, NIST, Arista, AWS…
}

const rfc = (n: number, title: string): Reference => ({
  title: `RFC ${n} · ${title}`,
  url: `https://www.rfc-editor.org/info/rfc${n}/`,
  source: 'IETF',
});
const ref = (source: string, title: string, url: string): Reference => ({ source, title, url });

// Documents utilisés sur plusieurs pages
const ieee8023 = ref('IEEE', 'IEEE 802.3 Ethernet Working Group', 'https://www.ieee802.org/3/');
const ieee8021 = ref('IEEE', 'IEEE 802.1 Working Group (802.1Q, 802.1AX, 802.1AB, 802.1X)', 'https://1.ieee802.org/');
const eosUserSecurity = ref('Arista', 'EOS User Manual · User Security (AAA, TACACS+, RADIUS, LDAP)', 'https://www.arista.com/en/um-eos/eos-user-security');
const eosSessionCommands = ref('Arista', 'EOS User Manual · Session Management Commands', 'https://www.arista.com/en/um-eos/eos-session-management-commands');
const ianaPorts = ref('IANA', 'Service Name and Transport Protocol Port Number Registry', 'https://www.iana.org/assignments/service-names-port-numbers');
const netboxDocs = ref('NetBox', 'NetBox documentation', 'https://netboxlabs.com/docs/netbox/');
const avdDocs = ref('Arista', 'Arista AVD documentation', 'https://avd.arista.com/');
const nist80041 = ref('NIST', 'SP 800-41 Rev. 1 · Guidelines on Firewalls and Firewall Policy', 'https://csrc.nist.gov/pubs/sp/800/41/r1/final');
const nist800207 = ref('NIST', 'SP 800-207 · Zero Trust Architecture', 'https://csrc.nist.gov/pubs/sp/800/207/final');
const awsVpc = ref('AWS', 'Amazon VPC User Guide', 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html');

export const references: Record<string, Reference[]> = {
  // Fondamentaux
  'courses/fundamentals/osi': [
    ref('ITU-T', 'X.200 · Open Systems Interconnection · Basic Reference Model (identical to ISO/IEC 7498-1)', 'https://www.itu.int/rec/T-REC-X.200-199407-I/en'),
    rfc(1122, 'Requirements for Internet Hosts · Communication Layers'),
  ],
  'courses/fundamentals/ethernet': [
    ieee8023,
    ref('IEEE', 'IEEE Registration Authority · OUI and MAC address assignments', 'https://standards.ieee.org/products-programs/regauth/'),
  ],
  'courses/fundamentals/vlan': [ieee8021],
  'courses/fundamentals/stp': [ieee8021],
  'courses/fundamentals/link-aggregation': [ieee8021],
  'courses/fundamentals/lldp-cdp': [ieee8021],
  'courses/fundamentals/ipv4-subnetting': [
    rfc(791, 'Internet Protocol'),
    rfc(1918, 'Address Allocation for Private Internets'),
    rfc(4632, 'Classless Inter-domain Routing (CIDR)'),
    rfc(3021, 'Using 31-Bit Prefixes on IPv4 Point-to-Point Links'),
    rfc(6598, 'IANA-Reserved IPv4 Prefix for Shared Address Space'),
    rfc(5737, 'IPv4 Address Blocks Reserved for Documentation'),
  ],
  'courses/fundamentals/arp': [
    rfc(826, 'An Ethernet Address Resolution Protocol'),
    rfc(5227, 'IPv4 Address Conflict Detection'),
  ],
  'courses/fundamentals/ipv6': [
    rfc(8200, 'Internet Protocol, Version 6 (IPv6) Specification'),
    rfc(4291, 'IP Version 6 Addressing Architecture'),
    rfc(5952, 'A Recommendation for IPv6 Address Text Representation'),
    rfc(4861, 'Neighbor Discovery for IP version 6 (IPv6)'),
    rfc(4862, 'IPv6 Stateless Address Autoconfiguration'),
    rfc(8415, 'Dynamic Host Configuration Protocol for IPv6 (DHCPv6)'),
    rfc(4193, 'Unique Local IPv6 Unicast Addresses'),
    rfc(8981, 'Temporary Address Extensions for Stateless Address Autoconfiguration in IPv6'),
    rfc(6164, 'Using 127-Bit IPv6 Prefixes on Inter-Router Links'),
    rfc(4890, 'Recommendations for Filtering ICMPv6 Messages in Firewalls'),
  ],
  'courses/fundamentals/static-routing': [rfc(1812, 'Requirements for IP Version 4 Routers')],
  'courses/fundamentals/tcp-udp': [
    rfc(9293, 'Transmission Control Protocol (TCP)'),
    rfc(768, 'User Datagram Protocol'),
    rfc(1191, 'Path MTU Discovery'),
    ianaPorts,
  ],
  'courses/fundamentals/cryptography': [
    ref('NIST', 'FIPS 197 · Advanced Encryption Standard (AES)', 'https://csrc.nist.gov/pubs/fips/197/final'),
    ref('NIST', 'FIPS 180-4 · Secure Hash Standard (SHA-2)', 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final'),
    ref('NIST', 'FIPS 203 · Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)', 'https://csrc.nist.gov/pubs/fips/203/final'),
    rfc(8017, 'PKCS #1: RSA Cryptography Specifications'),
    rfc(8032, 'Edwards-Curve Digital Signature Algorithm (EdDSA)'),
    rfc(7748, 'Elliptic Curves for Security (X25519)'),
    rfc(8446, 'The Transport Layer Security (TLS) Protocol Version 1.3'),
    ref('OpenSSL', 'OpenSSL 3.0 · openssl-pkeyutl manual', 'https://docs.openssl.org/3.0/man1/openssl-pkeyutl/'),
  ],

  // Routage dynamique
  'courses/routing/routing-protocols': [rfc(2328, 'OSPF Version 2'), rfc(4271, 'A Border Gateway Protocol 4 (BGP-4)')],
  'courses/routing/ospf': [rfc(2328, 'OSPF Version 2'), rfc(5340, 'OSPF for IPv6')],
  'courses/routing/bgp-basics': [
    rfc(4271, 'A Border Gateway Protocol 4 (BGP-4)'),
    rfc(6793, 'BGP Support for Four-Octet Autonomous System (AS) Number Space'),
    rfc(6996, 'Autonomous System (AS) Reservation for Private Use'),
  ],
  'courses/routing/bgp-attributes': [
    rfc(4271, 'A Border Gateway Protocol 4 (BGP-4)'),
    rfc(1997, 'BGP Communities Attribute'),
    rfc(8092, 'BGP Large Communities Attribute'),
    rfc(4456, 'BGP Route Reflection'),
  ],
  'courses/routing/bgp-policies': [
    rfc(7454, 'BGP Operations and Security'),
    rfc(8212, 'Default External BGP (EBGP) Route Propagation Behavior without Policies'),
    rfc(6811, 'BGP Prefix Origin Validation'),
    ref('MANRS', 'Mutually Agreed Norms for Routing Security', 'https://manrs.org/'),
  ],

  // Data center
  'courses/datacenter/vrf': [rfc(4364, 'BGP/MPLS IP Virtual Private Networks (VPNs)')],
  'courses/datacenter/spine-leaf': [rfc(7938, 'Use of BGP for Routing in Large-Scale Data Centers')],
  'courses/datacenter/physical': [
    ieee8023,
    ref('SNIA', 'SFF specifications (SFP, QSFP form factors and management)', 'https://www.snia.org/technology-communities/sff/specifications'),
    ref('OSFP MSA', 'OSFP Multi-Source Agreement', 'https://osfpmsa.org/'),
    ref('NetBox', 'Racks', 'https://netboxlabs.com/docs/netbox/models/dcim/rack/'),
    ref('NetBox', 'Devices & Cabling', 'https://netboxlabs.com/docs/netbox/features/devices-cabling/'),
  ],
  'courses/datacenter/cabling': [
    ieee8023,
    ref('IEEE', 'IEEE P802.3by · 25 Gb/s Ethernet Task Force (25GBASE-CR, -SR, FEC)', 'https://www.ieee802.org/3/by/'),
    ref('IEEE', 'IEEE P802.3bm · 40 Gb/s and 100 Gb/s Fiber Optic Task Force (100GBASE-SR4)', 'https://www.ieee802.org/3/bm/'),
    ref('IEEE', 'IEEE P802.3bs · 400 Gb/s Ethernet Task Force (400GBASE-SR8, -DR4, -FR8)', 'https://www.ieee802.org/3/bs/'),
    ref('SNIA', 'SFF specifications (SFP, QSFP form factors and digital monitoring)', 'https://www.snia.org/technology-communities/sff/specifications'),
    ref('OSFP MSA', 'OSFP Multi-Source Agreement', 'https://osfpmsa.org/'),
    ref('CWDM4 MSA', '100G CWDM4 Multi-Source Agreement', 'https://www.cwdm4-msa.org/'),
    ref('100G Lambda MSA', '100G Lambda Multi-Source Agreement (100G-DR, -FR, -LR)', 'https://100glambda.com/'),
    ref('FOA', 'The Fiber Optic Association · Guide to Fiber Optics', 'https://www.thefoa.org/tech/ref/contents.html'),
  ],
  'courses/datacenter/wdm': [
    ref('ITU-T', 'G.694.2 · Spectral grids for WDM applications: CWDM wavelength grid', 'https://www.itu.int/rec/T-REC-G.694.2'),
    ref('ITU-T', 'G.694.1 · Spectral grids for WDM applications: DWDM frequency grid', 'https://www.itu.int/rec/T-REC-G.694.1'),
    ref('OIF', 'OIF Implementation Agreements (400ZR)', 'https://www.oiforum.com/technical-work/implementation-agreements-ias/'),
    ref('OpenZR+ MSA', 'OpenZR+ Multi-Source Agreement', 'https://openzrplus.org/'),
    ref('FOA', 'The Fiber Optic Association · Guide to Fiber Optics', 'https://www.thefoa.org/tech/ref/contents.html'),
  ],
  'courses/datacenter/buffers': [
    rfc(3168, 'The Addition of Explicit Congestion Notification (ECN) to IP'),
    rfc(8257, 'Data Center TCP (DCTCP): TCP Congestion Control for Data Centers'),
    rfc(7567, 'IETF Recommendations Regarding Active Queue Management'),
    rfc(2474, 'Definition of the Differentiated Services Field (DS Field)'),
    rfc(9330, 'Low Latency, Low Loss, and Scalable Throughput (L4S) Internet Service: Architecture'),
    ref('IEEE', '802.1Qbb · Priority-based Flow Control', 'https://1.ieee802.org/dcb/802-1qbb/'),
    ref('IBTA', 'InfiniBand Trade Association (RoCE specifications)', 'https://www.infinibandta.org/'),
    ref('UEC', 'Ultra Ethernet Consortium', 'https://ultraethernet.org/'),
  ],
  'courses/datacenter/vxlan': [rfc(7348, 'Virtual eXtensible Local Area Network (VXLAN)')],
  'courses/datacenter/evpn': [
    rfc(7432, 'BGP MPLS-Based Ethernet VPN'),
    rfc(8365, 'A Network Virtualization Overlay Solution Using Ethernet VPN (EVPN)'),
    rfc(9135, 'Integrated Routing and Bridging in Ethernet VPN (EVPN)'),
    rfc(9136, 'IP Prefix Advertisement in Ethernet VPN (EVPN)'),
  ],

  // Automatisation
  'courses/automation/python': [
    ref('Python', 'venv · Creation of virtual environments', 'https://docs.python.org/3/library/venv.html'),
    ref('Netmiko', 'Netmiko', 'https://github.com/ktbyers/netmiko'),
    ref('Arista', 'pyeapi', 'https://github.com/arista-eosplus/pyeapi'),
  ],
  'courses/automation/ansible': [
    ref('Ansible', 'Ansible network automation guide', 'https://docs.ansible.com/projects/ansible/latest/network/getting_started/index.html'),
    ref('Ansible', 'arista.eos collection', 'https://docs.ansible.com/projects/ansible/latest/collections/arista/eos/index.html'),
    ref('Ansible', 'Protecting sensitive data with Ansible Vault', 'https://docs.ansible.com/projects/ansible/latest/vault_guide/index.html'),
  ],
  'courses/automation/config-backup': [
    ref('GitLab', 'GitLab CI/CD', 'https://docs.gitlab.com/ci/'),
    ref('GitLab', 'Scheduled pipelines', 'https://docs.gitlab.com/ci/pipelines/schedules/'),
    ref('Git', 'Pro Git book', 'https://git-scm.com/book/en/v2'),
  ],
  'courses/automation/breakglass-rotation': [
    eosUserSecurity,
    rfc(8907, 'The Terminal Access Controller Access-Control System Plus (TACACS+) Protocol'),
    ref('Ansible', 'Protecting sensitive data with Ansible Vault', 'https://docs.ansible.com/projects/ansible/latest/vault_guide/index.html'),
  ],
  'courses/automation/naming-ipam': [
    rfc(1918, 'Address Allocation for Private Internets'),
    rfc(6996, 'Autonomous System (AS) Reservation for Private Use'),
    netboxDocs,
  ],
  'courses/automation/netbox': [
    netboxDocs,
    ref('NetBox', 'pynetbox', 'https://github.com/netbox-community/pynetbox'),
    ref('Ansible', 'netbox.netbox collection', 'https://docs.ansible.com/projects/ansible/latest/collections/netbox/netbox/index.html'),
  ],
  'courses/automation/avd': [
    avdDocs,
    ref('Arista', 'ANTA · Arista Network Test Automation', 'https://anta.arista.com/'),
  ],

  // Sécurité
  'courses/security/ngfw-basics': [
    nist80041,
    rfc(3022, 'Traditional IP Network Address Translator (Traditional NAT)'),
    ref('nftables', 'nftables wiki', 'https://wiki.nftables.org/'),
  ],
  'courses/security/security-policies': [nist80041],
  'courses/security/ipsec-vpn': [
    rfc(4301, 'Security Architecture for the Internet Protocol'),
    rfc(4303, 'IP Encapsulating Security Payload (ESP)'),
    rfc(7296, 'Internet Key Exchange Protocol Version 2 (IKEv2)'),
    rfc(3948, 'UDP Encapsulation of IPsec ESP Packets'),
    rfc(8221, 'Cryptographic Algorithm Implementation Requirements and Usage Guidance for ESP and AH'),
    ref('strongSwan', 'strongSwan documentation', 'https://docs.strongswan.org/'),
  ],
  'courses/security/traffic-flows': [nist800207, nist80041],
  'courses/security/segmentation': [nist800207, ieee8021],

  // Proxy et load balancing
  'courses/proxy/forward-proxy': [
    rfc(9110, 'HTTP Semantics'),
    ref('Squid', 'Squid documentation', 'https://www.squid-cache.org/Doc/'),
  ],
  'courses/proxy/tls-pki': [
    rfc(8446, 'The Transport Layer Security (TLS) Protocol Version 1.3'),
    rfc(5280, 'Internet X.509 Public Key Infrastructure Certificate and CRL Profile'),
    rfc(6066, 'Transport Layer Security (TLS) Extensions (SNI)'),
    rfc(6960, 'Online Certificate Status Protocol (OCSP)'),
    ref('CA/Browser Forum', 'Baseline Requirements for TLS Server Certificates', 'https://cabforum.org/working-groups/server/baseline-requirements/'),
  ],
  'courses/proxy/reverse-proxy': [
    ref('HAProxy', 'HAProxy documentation', 'https://docs.haproxy.org/'),
    ref('nginx', 'nginx documentation', 'https://nginx.org/en/docs/'),
    rfc(7239, 'Forwarded HTTP Extension'),
  ],
  'courses/proxy/load-balancing': [
    ref('F5', 'F5 Cloud Docs · BIG-IP APIs, iRules and tmsh reference', 'https://clouddocs.f5.com/'),
    ref('HAProxy', 'HAProxy documentation', 'https://docs.haproxy.org/'),
  ],
  'courses/proxy/waf': [
    ref('OWASP', 'OWASP Top 10', 'https://owasp.org/projects/top-ten'),
    ref('OWASP', 'OWASP Core Rule Set', 'https://coreruleset.org/'),
  ],

  // Services et observabilité
  'courses/operations/ddi': [
    rfc(1034, 'Domain Names · Concepts and Facilities'),
    rfc(1035, 'Domain Names · Implementation and Specification'),
    rfc(2131, 'Dynamic Host Configuration Protocol'),
    rfc(2136, 'Dynamic Updates in the Domain Name System (DNS UPDATE)'),
    ref('ISC', 'Kea DHCP documentation', 'https://kea.readthedocs.io/'),
    ref('ISC', 'BIND 9 documentation', 'https://bind9.readthedocs.io/'),
  ],
  'courses/operations/oob': [
    eosSessionCommands,
    rfc(4253, 'The Secure Shell (SSH) Transport Layer Protocol'),
  ],
  'courses/operations/monitoring': [
    rfc(3411, 'An Architecture for Describing SNMP Management Frameworks'),
    rfc(3414, 'User-based Security Model (USM) for SNMPv3'),
    rfc(5424, 'The Syslog Protocol'),
    rfc(3954, 'Cisco Systems NetFlow Services Export Version 9'),
    rfc(7011, 'Specification of the IP Flow Information Export (IPFIX) Protocol'),
    ref('sFlow', 'sFlow.org', 'https://sflow.org/'),
  ],
  'courses/operations/telemetry': [
    ref('OpenConfig', 'gNMI specification', 'https://github.com/openconfig/reference/blob/master/rpc/gnmi/gnmi-specification.md'),
    ref('OpenConfig', 'gNMIc documentation', 'https://gnmic.openconfig.net/'),
    ref('OpenConfig', 'OpenConfig', 'https://www.openconfig.net/'),
  ],
  'courses/operations/prometheus-grafana': [
    ref('Prometheus', 'Prometheus documentation', 'https://prometheus.io/docs/introduction/overview/'),
    ref('Prometheus', 'Alertmanager', 'https://prometheus.io/docs/alerting/latest/alertmanager/'),
    ref('Grafana', 'Grafana documentation', 'https://grafana.com/docs/grafana/latest/'),
  ],

  // Le réseau dans le cloud
  'courses/cloud/aws-vpc': [
    awsVpc,
    ref('AWS', 'Subnet CIDR blocks (reserved addresses)', 'https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html'),
    ref('AWS', 'NAT gateways', 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html'),
    ref('Microsoft', 'Azure Virtual Network overview', 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview'),
    ref('Google Cloud', 'VPC networks', 'https://docs.cloud.google.com/vpc/docs/vpc'),
  ],
  'courses/cloud/security-groups': [
    ref('AWS', 'Security groups', 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html'),
    ref('AWS', 'Network ACLs', 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html'),
    ref('AWS', 'VPC Flow Logs', 'https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html'),
    ref('AWS', 'Flow log records', 'https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html'),
  ],
  'courses/cloud/transit-gateway': [
    ref('AWS', 'VPC peering', 'https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html'),
    ref('AWS', 'AWS Transit Gateway', 'https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html'),
    ref('AWS', 'AWS PrivateLink', 'https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html'),
  ],
  'courses/cloud/hybrid-cloud': [
    ref('AWS', 'AWS Site-to-Site VPN', 'https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html'),
    ref('AWS', 'Site-to-Site VPN routing options and route priority', 'https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNRoutingTypes.html'),
    ref('AWS', 'AWS Direct Connect', 'https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html'),
    ref('AWS', 'Direct Connect routing policies and BGP communities', 'https://docs.aws.amazon.com/directconnect/latest/UserGuide/routing-and-bgp.html'),
  ],
  'courses/cloud/terraform': [
    ref('HashiCorp', 'Terraform documentation', 'https://developer.hashicorp.com/terraform/docs'),
    ref('HashiCorp', 'AWS provider', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs'),
    ref('HashiCorp', 'S3 backend (state storage and locking)', 'https://developer.hashicorp.com/terraform/language/backend/s3'),
    ref('OpenTofu', 'OpenTofu documentation', 'https://opentofu.org/docs/'),
  ],

  // Tutoriels
  'tutorials/bgp-evpn-route-types': [
    rfc(7432, 'BGP MPLS-Based Ethernet VPN'),
    rfc(8365, 'A Network Virtualization Overlay Solution Using Ethernet VPN (EVPN)'),
    rfc(9136, 'IP Prefix Advertisement in Ethernet VPN (EVPN)'),
    rfc(9251, 'Internet Group Management Protocol (IGMP) and Multicast Listener Discovery (MLD) Proxies for Ethernet VPN (EVPN)'),
  ],
  'tutorials/containerlab-setup': [
    ref('ContainerLab', 'ContainerLab documentation', 'https://containerlab.dev/'),
    ref('Docker', 'Install Docker Engine', 'https://docs.docker.com/engine/install/'),
  ],
  'tutorials/cvp-deployment': [
    ref('Arista', 'Product Documentation Library (CloudVision guides)', 'https://www.arista.com/en/support/product-documentation'),
    ref('Arista', 'CloudVision Help Center', 'https://www.arista.io/help/'),
  ],
  'tutorials/git-branches': [
    ref('Git', 'Pro Git book · Git Branching', 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell'),
    ref('Git', 'Git reference documentation', 'https://git-scm.com/docs'),
    ref('GitLab', 'Merge requests', 'https://docs.gitlab.com/user/project/merge_requests/'),
  ],
  'tutorials/internet-wan': [
    rfc(1930, 'Guidelines for creation, selection, and registration of an Autonomous System (AS)'),
    rfc(4271, 'A Border Gateway Protocol 4 (BGP-4)'),
    ref('PeeringDB', 'PeeringDB', 'https://www.peeringdb.com/'),
    ref('TeleGeography', 'Submarine Cable Map', 'https://www.submarinecablemap.com/'),
  ],
  'tutorials/jinja-netbox': [
    ref('Pallets', 'Jinja template designer documentation', 'https://jinja.palletsprojects.com/en/stable/templates/'),
    netboxDocs,
    avdDocs,
  ],
  'tutorials/lan-wan-pan': [
    ref('IEEE', 'IEEE 802 LAN/MAN Standards Committee', 'https://www.ieee802.org/'),
    ieee8023,
    ref('IEEE', 'IEEE 802.11 Wireless LAN Working Group', 'https://www.ieee802.org/11/'),
    ref('IEEE', 'IEEE 802.15 Wireless Specialty Networks Working Group', 'https://www.ieee802.org/15/'),
  ],
  'tutorials/ldaps-arista': [
    eosUserSecurity,
    eosSessionCommands,
    rfc(4511, 'Lightweight Directory Access Protocol (LDAP): The Protocol'),
    rfc(8907, 'The Terminal Access Controller Access-Control System Plus (TACACS+) Protocol'),
  ],
  'tutorials/loki-logs': [
    ref('Grafana', 'Grafana Loki documentation', 'https://grafana.com/docs/loki/latest/'),
    ref('Grafana', 'Grafana Alloy documentation', 'https://grafana.com/docs/alloy/latest/'),
    rfc(5424, 'The Syslog Protocol'),
  ],
  'tutorials/mpls': [
    rfc(3031, 'Multiprotocol Label Switching Architecture'),
    rfc(3032, 'MPLS Label Stack Encoding'),
    rfc(5036, 'LDP Specification'),
    rfc(4364, 'BGP/MPLS IP Virtual Private Networks (VPNs)'),
  ],
  'tutorials/netbox-plugins': [
    netboxDocs,
    ref('NetBox', 'netbox-docker', 'https://github.com/netbox-community/netbox-docker'),
    ref('NetBox', 'netbox-bgp plugin', 'https://github.com/netbox-community/netbox-bgp'),
  ],
  'tutorials/rfc': [
    ref('IETF', 'Introduction to the IETF', 'https://www.ietf.org/about/introduction/'),
    ref('IETF', 'Guide to the IETF standards process', 'https://www.ietf.org/process/process/'),
    rfc(2026, 'The Internet Standards Process · Revision 3'),
    rfc(6410, 'Reducing the Standards Track to Two Maturity Levels'),
    rfc(2119, 'Key words for use in RFCs to Indicate Requirement Levels'),
    rfc(8174, 'Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words'),
    rfc(1, 'Host Software'),
    rfc(9293, 'Transmission Control Protocol (TCP)'),
    ref('RFC Editor', 'RFC Editor', 'https://www.rfc-editor.org/'),
    ref('IETF', 'IETF Datatracker', 'https://datatracker.ietf.org/'),
    ref('IANA', 'Internet Assigned Numbers Authority', 'https://www.iana.org/'),
  ],
  'tutorials/sdwan': [ref('Mplify (ex-MEF)', 'SD-WAN service standards (MEF 70)', 'https://www.mplify.net/service-standards/overlay-services/sd-wan/')],
  'tutorials/troubleshooting': [
    ref('tcpdump', 'tcpdump manual', 'https://www.tcpdump.org/manpages/tcpdump.1.html'),
    ref('Wireshark', 'Wireshark documentation', 'https://www.wireshark.org/docs/'),
    rfc(1122, 'Requirements for Internet Hosts · Communication Layers'),
  ],
};

/** Références d'une page de formation ("index" pour la présentation) ou d'un tutoriel */
export const referencesFor = (key: string): Reference[] => references[key] ?? [];
