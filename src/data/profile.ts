// Photo locale, optimisée au build par Astro (WebP, bonnes dimensions).
// Pour la changer : remplacer src/assets/avatar.png en gardant le même nom.
import avatar from '@/assets/avatar.png';

export const profile = {
  name: 'Antoine Lecarpentier',
  avatar,
  links: {
    linkedin: 'https://www.linkedin.com/in/antoine-lecarpentier-64b292183',
    github: 'https://github.com/anntoiiinee',
    resume: 'https://resume.alcpt.network',
    repo: 'https://github.com/anntoiiinee/nexthop',
    // Page Buy Me a Coffee, ex. 'https://buymeacoffee.com/ton-identifiant'.
    // Vide = aucun bouton café affiché sur le site.
    coffee: 'https://buymeacoffee.com/anntoiiinee',
  },
  certifications: ['Arista ACE:L5', 'Arista DCE', 'Arista WAN', 'Cisco CCNP', 'Cisco CCNA'],
  stats: [
    { value: '6+', fr: "ans d'expérience", en: 'years of experience' },
    { value: '10k+', fr: 'ports switch gérés', en: 'switch ports managed' },
    { value: '50+', fr: 'sites gérés', en: 'sites managed' },
    { value: '2k+', fr: 'postes sécurisés', en: 'endpoints secured' },
  ],
  stack: [
    {
      title: { fr: 'Switching & routage', en: 'Switching & routing' },
      items: ['Arista EOS', 'Cisco IOS/NX-OS', 'EVPN VxLAN', 'BGP / OSPF', 'VLAN / STP', 'MPLS', 'NAC / 802.1X'],
    },
    {
      title: { fr: 'Firewalling & sécurité', en: 'Firewalling & security' },
      items: ['Palo Alto', 'Fortinet', 'Stormshield', 'F5 BIG-IP', 'PKI / TLS', 'Cisco ISE'],
    },
    {
      title: { fr: 'Automatisation & IaC', en: 'Automation & IaC' },
      items: ['Ansible / AVD', 'Python', 'GitLab CI/CD', 'Jenkins', 'NetBox', 'ContainerLab'],
    },
    {
      title: { fr: 'Infra & supervision', en: 'Infra & monitoring' },
      items: ['AWS', 'CloudVision', 'Prometheus', 'Grafana', 'gNMIc', 'Nutanix', 'Linux'],
    },
  ],
    experience: [
    {
      period: { fr: "2025 — aujourd'hui", en: '2025 — present' },
      company: { fr: 'SQUAD · Airbus Defence and Space Intelligence', en: 'SQUAD · Airbus Defence and Space Intelligence' },
      role: { fr: 'IT Network Specialist', en: 'IT Network Specialist' },
      points: {
        fr: [
          'Migration de la fabric data center de VxLAN HER vers EVPN/BGP, en Infrastructure as Code avec Arista AVD',
          'Weather map de télémétrie temps réel avec gNMIc, Prometheus et Grafana',
          'Sauvegardes et renouvellement des certificats des switches automatisés avec Ansible et GitLab CI',
          'Migration des firewalls en fin de vie vers des plateformes nouvelle génération',
        ],
        en: [
          'Migrated the datacenter fabric from VxLAN HER to EVPN/BGP as Infrastructure as Code with Arista AVD',
          'Real-time telemetry weather map with gNMIc, Prometheus and Grafana',
          'Automated switch backups and certificate renewal with Ansible and GitLab CI',
          'Migrated end-of-life firewalls to next-generation platforms',
        ],
      },
    },
    {
      period: { fr: '2022 — 2025', en: '2022 — 2025' },
      company: { fr: 'Devoteam · Airbus Aircraft', en: 'Devoteam · Airbus Aircraft' },
      role: { fr: 'Ingénieur NetOps & automatisation', en: 'NetOps & Automation Engineer' },
      points: {
        fr: [
          "Migration automatisée de campus multi-sites d'une architecture Cisco 3-tiers vers une fabric Arista spine/leaf EVPN-VxLAN",
          'Scripts Python (AWS serverless) générant les configs underlay, overlay et admin depuis NetBox',
          "Déploiement via CloudVision avec AVD et CVPRAC, tests d'infrastructure avec ContainerLab",
        ],
        en: [
          'Automated migration of multi-site campuses from a Cisco 3-tier design to an Arista spine/leaf EVPN-VxLAN fabric',
          'Python scripts (AWS serverless) generating underlay, overlay and admin configs from NetBox',
          'Deployment through CloudVision with AVD and CVPRAC, infrastructure testing with ContainerLab',
        ],
      },
    },
    {
      period: { fr: '2021 — 2022', en: '2021 — 2022' },
      company: { fr: 'Malherbe', en: 'Malherbe' },
      role: { fr: 'Administrateur systèmes & réseaux', en: 'Network & Systems Administrator' },
      points: {
        fr: [
          'Intégration et durcissement de firewalls Stormshield, Fortigate et Palo Alto',
          'Conception du réseau du siège : Wi-Fi, VLAN, segmentation, NAC, VoIP',
          'Audit ISO/IEC 27002 et rédaction de la politique de sécurité du SI',
        ],
        en: [
          'Integrated and hardened Stormshield, Fortigate and Palo Alto firewalls',
          'Designed the HQ network: Wi-Fi, VLANs, segmentation, NAC, VoIP',
          'ISO/IEC 27002 audit and authored the information security policy',
        ],
      },
    },
    {
      period: { fr: '2019 — 2021', en: '2019 — 2021' },
      company: { fr: 'Malherbe', en: 'Malherbe' },
      role: { fr: 'Technicien systèmes & réseaux', en: 'IT Systems & Network Technician' },
      points: {
        fr: [
          "Plan de reprise d'activité et migration de Hyper-V vers Nutanix",
          'Refonte du cœur de réseau en Cisco Nexus et déploiement de switches Aruba 10G',
          'Support de 400 utilisateurs répartis sur 12 agences',
        ],
        en: [
          'Disaster recovery plan and migration from Hyper-V to Nutanix',
          'Redesigned the network core with Cisco Nexus and deployed 10G Aruba switches',
          'Support for 400 users across 12 branch offices',
        ],
      },
    },
  ],
  education: [
    {
      period: '2019 — 2021',
      school: 'Groupe AIFCC',
      degree: { fr: 'BTS SIO option SISR', en: 'BTS SIO, infrastructure & networks track' },
    },
    {
      period: '2021 — 2022',
      school: 'Université de Caen Normandie',
      degree: { fr: 'Licence pro ASRSI (audit et sécurité des réseaux)', en: "Professional bachelor's in network & security auditing" },
    },
    {
      period: '2022 — 2024',
      school: 'CESI',
      degree: { fr: 'Master Manager en infrastructure et cybersécurité', en: "Master's in infrastructure & cybersecurity management" },
    },
  ],
};