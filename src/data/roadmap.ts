type T = { fr: string; en: string };

export interface RoadmapStep {
  course: string;
  label: string;
  title: T;
  text: T;
  chapters: { slug: string; title: T }[];
  // Niveau prévu, affiché tant que la formation n'est pas publiée (ensuite, c'est le `level` de son index qui fait foi)
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export const roadmap: RoadmapStep[] = [
  {
    course: 'fundamentals',
    label: 'L2 / L3',
    title: { fr: 'Les fondamentaux', en: 'Fundamentals' },
    text: { fr: 'Les bases sans lesquelles rien d’autre ne tient.', en: 'The foundations everything else is built on.' },
    chapters: [
      { slug: 'osi', title: { fr: 'Le modèle OSI', en: 'The OSI model' } },
      { slug: 'ethernet', title: { fr: 'Ethernet et adresses MAC', en: 'Ethernet and MAC addresses' } },
      { slug: 'vlan', title: { fr: 'Les VLAN', en: 'VLANs' } },
      { slug: 'stp', title: { fr: 'Spanning Tree (STP)', en: 'Spanning Tree (STP)' } },
      { slug: 'link-aggregation', title: { fr: 'Agrégation de liens et MLAG', en: 'Link aggregation and MLAG' } },
      { slug: 'lldp-cdp', title: { fr: 'LLDP et CDP', en: 'LLDP and CDP' } },
      { slug: 'ipv4-subnetting', title: { fr: 'Adressage IPv4 et subnetting', en: 'IPv4 addressing and subnetting' } },
      { slug: 'arp', title: { fr: 'ARP', en: 'ARP' } },
      { slug: 'ipv6', title: { fr: 'IPv6', en: 'IPv6' } },
      { slug: 'static-routing', title: { fr: 'Le routage statique', en: 'Static routing' } },
      { slug: 'tcp-udp', title: { fr: 'TCP et UDP', en: 'TCP and UDP' } },
      { slug: 'cryptography', title: { fr: 'Le chiffrement et les clés', en: 'Encryption and keys' } },
    ],
  },
  {
    course: 'routing',
    label: 'OSPF · BGP',
    title: { fr: 'Le routage dynamique', en: 'Dynamic routing' },
    text: { fr: 'Comment les routeurs apprennent le réseau tout seuls.', en: 'How routers learn the network on their own.' },
    chapters: [
      { slug: 'routing-protocols', title: { fr: 'Pourquoi le routage dynamique', en: 'Why dynamic routing' } },
      { slug: 'ospf', title: { fr: 'Les bases d’OSPF', en: 'OSPF basics' } },
      { slug: 'bgp-basics', title: { fr: 'Les bases de BGP', en: 'BGP basics' } },
      { slug: 'bgp-attributes', title: { fr: 'Attributs et meilleur chemin', en: 'Attributes and best path' } },
      { slug: 'bgp-policies', title: { fr: 'Politiques de routage', en: 'Routing policies' } },
    ],
  },
  {
    course: 'datacenter',
    label: 'VRF · EVPN',
    title: { fr: 'Le data center', en: 'The data center' },
    text: { fr: 'Les architectures des data centers modernes.', en: 'How modern data centers are built.' },
    chapters: [
      { slug: 'vrf', title: { fr: 'Les VRF', en: 'VRFs' } },
      { slug: 'spine-leaf', title: { fr: 'L’architecture spine/leaf', en: 'Spine/leaf architecture' } },
      { slug: 'physical', title: { fr: 'L’infrastructure physique', en: 'Physical infrastructure' } },
      { slug: 'cabling', title: { fr: 'La connectique', en: 'Cabling and connectors' } },
      { slug: 'wdm', title: { fr: 'Le multiplexage WDM', en: 'WDM multiplexing' } },
      { slug: 'buffers', title: { fr: 'Les buffers des switches', en: 'Switch buffers' } },
      { slug: 'vxlan', title: { fr: 'VxLAN', en: 'VxLAN' } },
      { slug: 'evpn', title: { fr: 'EVPN, le control plane', en: 'EVPN, the control plane' } },
    ],
  },
  {
    course: 'automation',
    label: 'NetOps',
    title: { fr: 'L’automatisation', en: 'Automation' },
    text: { fr: 'Gérer son réseau comme du code.', en: 'Managing your network as code.' },
    chapters: [
      { slug: 'python', title: { fr: 'Python pour le réseau', en: 'Python for networking' } },
      { slug: 'ansible', title: { fr: 'Ansible pour le réseau', en: 'Ansible for networking' } },
      { slug: 'config-backup', title: { fr: 'Sauvegardes GitOps', en: 'GitOps backups' } },
      { slug: 'breakglass-rotation', title: { fr: 'Rotation du compte de secours', en: 'Break-glass account rotation' } },
      { slug: 'naming-ipam', title: { fr: 'Conventions de nommage et IPAM', en: 'Naming conventions and IPAM' } },
      { slug: 'netbox', title: { fr: 'NetBox, source de vérité', en: 'NetBox as source of truth' } },
      { slug: 'avd', title: { fr: 'Arista AVD', en: 'Arista AVD' } },
    ],
  },
  {
    course: 'security',
    label: 'NSE',
    title: { fr: 'La sécurité', en: 'Security' },
    text: { fr: 'Protéger et segmenter le réseau.', en: 'Protecting and segmenting the network.' },
    chapters: [
      { slug: 'ngfw-basics', title: { fr: 'Les bases d’un firewall', en: 'Firewall basics' } },
      { slug: 'security-policies', title: { fr: 'Politiques de sécurité', en: 'Security policies' } },
      { slug: 'ipsec-vpn', title: { fr: 'VPN IPsec', en: 'IPsec VPN' } },
      { slug: 'traffic-flows', title: { fr: 'Flux nord-sud et est-ouest', en: 'North-south and east-west traffic' } },
      { slug: 'segmentation', title: { fr: 'Segmentation', en: 'Segmentation' } },
    ],
  },
  {
    course: 'proxy',
    label: 'Proxy · LB',
    title: { fr: 'Proxy et load balancing', en: 'Proxy and load balancing' },
    text: { fr: 'Contrôler les flux sortants et publier les applications.', en: 'Controlling outbound traffic and publishing applications.' },
    chapters: [
      { slug: 'forward-proxy', title: { fr: 'Le proxy sortant', en: 'Forward proxy' } },
      { slug: 'tls-pki', title: { fr: 'TLS, certificats et inspection', en: 'TLS, certificates and inspection' } },
      { slug: 'reverse-proxy', title: { fr: 'Le reverse proxy', en: 'Reverse proxy' } },
      { slug: 'load-balancing', title: { fr: 'Load balancing et F5 BIG-IP', en: 'Load balancing and F5 BIG-IP' } },
      { slug: 'waf', title: { fr: 'WAF et protection applicative', en: 'WAF and application protection' } },
    ],
  },
  {
    course: 'operations',
    label: 'DDI · Monitoring',
    title: { fr: 'Services et observabilité', en: 'Services and observability' },
    text: { fr: 'Servir, superviser et garder la main sur le réseau.', en: 'Serving, monitoring and keeping control of the network.' },
    chapters: [
      { slug: 'ddi', title: { fr: 'DDI : DNS, DHCP et IPAM', en: 'DDI: DNS, DHCP and IPAM' } },
      { slug: 'oob', title: { fr: 'Management et accès hors bande', en: 'Management and out-of-band access' } },
      { slug: 'monitoring', title: { fr: 'SNMP, syslog et NetFlow', en: 'SNMP, syslog and NetFlow' } },
      { slug: 'telemetry', title: { fr: 'Télémétrie avec gNMI et gNMIc', en: 'Telemetry with gNMI and gNMIc' } },
      { slug: 'prometheus-grafana', title: { fr: 'Prometheus et Grafana', en: 'Prometheus and Grafana' } },
    ],
  },
  {
    course: 'cloud',
    label: 'Cloud · Hybride',
    level: 'intermediate',
    title: { fr: 'Le réseau dans le cloud', en: 'Cloud networking' },
    text: { fr: 'Étendre le réseau de l’entreprise jusque dans le cloud.', en: 'Extending the corporate network into the cloud.' },
    chapters: [
      { slug: 'aws-vpc', title: { fr: 'Les bases du réseau AWS', en: 'AWS networking basics' } },
      { slug: 'security-groups', title: { fr: 'Security groups et NACL', en: 'Security groups and NACLs' } },
      { slug: 'transit-gateway', title: { fr: 'Interconnecter des VPC', en: 'Interconnecting VPCs' } },
      { slug: 'hybrid-cloud', title: { fr: 'Le cloud hybride : VPN et Direct Connect', en: 'Hybrid cloud: VPN and Direct Connect' } },
      { slug: 'terraform', title: { fr: 'Le réseau en code avec Terraform', en: 'Network as code with Terraform' } },
    ],
  },
];