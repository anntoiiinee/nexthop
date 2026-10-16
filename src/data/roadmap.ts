type T = { fr: string; en: string };

export interface RoadmapStep {
  course: string;
  label: string;
  title: T;
  text: T;
  chapters: { slug: string; title: T }[];
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
      { slug: 'lldp-cdp', title: { fr: 'LLDP et CDP', en: 'LLDP and CDP' } },
      { slug: 'ipv4-subnetting', title: { fr: 'Adressage IPv4 et subnetting', en: 'IPv4 addressing and subnetting' } },
      { slug: 'arp', title: { fr: 'ARP', en: 'ARP' } },
      { slug: 'static-routing', title: { fr: 'Le routage statique', en: 'Static routing' } },
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
      { slug: 'segmentation', title: { fr: 'Segmentation', en: 'Segmentation' } },
    ],
  },
];