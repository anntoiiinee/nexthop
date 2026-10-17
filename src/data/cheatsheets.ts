import type { Lang } from '@/i18n/ui';

// Fiches mémo imprimables : une page A4 par fiche, générées à partir de ces données.
// Les commandes ne se traduisent pas ; seules les descriptions et les titres sont en FR et EN.
// Une ligne a une cellule par colonne de la section (`head`) : une cellule vide = sans équivalent.
// Une cellule est une commande (texte identique en FR et EN) ou, plus rarement, un texte traduit.

type T = Record<Lang, string>;

export interface CheatRow {
  cells: (string | T)[];
  desc?: T;
}

export interface CheatSection {
  title: T;
  /** En-têtes des colonnes de commandes ; à défaut, ceux de la fiche */
  head?: T[];
  rows: CheatRow[];
}

export interface Cheatsheet {
  slug: string;
  badge: string;
  title: T;
  intro: T;
  /** Colonnes de commandes par défaut (Arista EOS, Cisco IOS…) */
  head: T[];
  sections: CheatSection[];
  /** Chapitres liés : la fiche est proposée à la fin de chacun */
  chapters?: { course: string; chapter: string }[];
  /** Tutoriels liés (slug) */
  tutorials?: string[];
}

const eos: T = { fr: 'Arista EOS', en: 'Arista EOS' };
const ios: T = { fr: 'Cisco IOS', en: 'Cisco IOS' };
const same = (cmd: string): string[] => [cmd, cmd];

export const cheatsheets: Cheatsheet[] = [
  {
    slug: 'switching',
    badge: 'L2',
    title: { fr: 'Commutation : VLAN, STP, LACP, LLDP', en: 'Switching: VLAN, STP, LACP, LLDP' },
    intro: {
      fr: 'Les commandes de vérification et de configuration d’un switch d’accès ou de distribution.',
      en: 'Verification and configuration commands for an access or distribution switch.',
    },
    head: [eos, ios],
    chapters: [
      { course: 'fundamentals', chapter: 'vlan' },
      { course: 'fundamentals', chapter: 'stp' },
      { course: 'fundamentals', chapter: 'link-aggregation' },
      { course: 'fundamentals', chapter: 'lldp-cdp' },
    ],
    sections: [
      {
        title: { fr: 'Interfaces et VLAN', en: 'Interfaces and VLANs' },
        rows: [
          { cells: same('show interfaces status'), desc: { fr: 'État, VLAN, vitesse et duplex de chaque port', en: 'State, VLAN, speed and duplex of each port' } },
          { cells: ['show vlan', 'show vlan brief'], desc: { fr: 'VLAN existants et ports d’accès associés', en: 'Existing VLANs and their access ports' } },
          { cells: same('show interfaces trunk'), desc: { fr: 'Trunks, VLAN natif et VLAN autorisés', en: 'Trunks, native VLAN and allowed VLANs' } },
          { cells: same('show mac address-table'), desc: { fr: 'Adresses MAC apprises, par VLAN et par port', en: 'Learned MAC addresses, per VLAN and port' } },
          { cells: same('show mac address-table address <mac>'), desc: { fr: 'Sur quel port se trouve une machine', en: 'Which port a machine is on' } },
          { cells: same('show interfaces counters errors'), desc: { fr: 'Erreurs CRC et de trame : câble ou optique en cause', en: 'CRC and frame errors: cable or optic at fault' } },
        ],
      },
      {
        title: { fr: 'Spanning Tree', en: 'Spanning Tree' },
        rows: [
          { cells: same('show spanning-tree'), desc: { fr: 'Racine, rôle et état de chaque port', en: 'Root, role and state of each port' } },
          { cells: same('show spanning-tree root'), desc: { fr: 'Pont racine de chaque instance', en: 'Root bridge of each instance' } },
          { cells: same('show spanning-tree blockedports'), desc: { fr: 'Ports bloqués par STP', en: 'Ports blocked by STP' } },
        ],
      },
      {
        title: { fr: 'Agrégation et voisins', en: 'Aggregation and neighbors' },
        rows: [
          { cells: ['show port-channel summary', 'show etherchannel summary'], desc: { fr: 'Port-channels et état de leurs membres', en: 'Port-channels and their members’ state' } },
          { cells: same('show lacp neighbor'), desc: { fr: 'Partenaire LACP vu sur chaque membre', en: 'LACP partner seen on each member' } },
          { cells: same('show lldp neighbors'), desc: { fr: 'Voisins LLDP : nom et port d’en face', en: 'LLDP neighbors: name and remote port' } },
          { cells: ['', 'show cdp neighbors'], desc: { fr: 'Voisins CDP (protocole propre à Cisco)', en: 'CDP neighbors (Cisco-specific protocol)' } },
        ],
      },
      {
        title: { fr: 'Configuration', en: 'Configuration' },
        rows: [
          { cells: same('vlan 10\n   name USERS'), desc: { fr: 'Créer et nommer un VLAN', en: 'Create and name a VLAN' } },
          { cells: same('switchport mode access\nswitchport access vlan 10'), desc: { fr: 'Port d’accès dans le VLAN 10', en: 'Access port in VLAN 10' } },
          { cells: same('switchport mode trunk\nswitchport trunk allowed vlan 10,20'), desc: { fr: 'Trunk limité aux VLAN utiles', en: 'Trunk limited to the needed VLANs' } },
          { cells: same('channel-group 1 mode active'), desc: { fr: 'Ajouter le port à un port-channel LACP', en: 'Add the port to an LACP port-channel' } },
          { cells: same('spanning-tree portfast\nspanning-tree bpduguard enable'), desc: { fr: 'Port vers un poste : actif tout de suite, coupé s’il reçoit une BPDU', en: 'Port to a host: up at once, shut if it receives a BPDU' } },
        ],
      },
    ],
  },
  {
    slug: 'routing',
    badge: 'L3',
    title: { fr: 'Routage IP : statique et OSPF', en: 'IP routing: static and OSPF' },
    intro: {
      fr: 'Adresses, table de routage, ARP, routes statiques et OSPF.',
      en: 'Addresses, routing table, ARP, static routes and OSPF.',
    },
    head: [eos, ios],
    chapters: [
      { course: 'fundamentals', chapter: 'ipv4-subnetting' },
      { course: 'fundamentals', chapter: 'arp' },
      { course: 'fundamentals', chapter: 'static-routing' },
      { course: 'routing', chapter: 'ospf' },
    ],
    sections: [
      {
        title: { fr: 'Adresses et table de routage', en: 'Addresses and routing table' },
        rows: [
          { cells: same('show ip interface brief'), desc: { fr: 'Adresse et état de chaque interface', en: 'Address and state of each interface' } },
          { cells: same('show ip route'), desc: { fr: 'Table de routage complète', en: 'Full routing table' } },
          { cells: same('show ip route <ip>'), desc: { fr: 'Route utilisée pour une destination', en: 'Route used for a destination' } },
          { cells: ['show ip arp', 'show ip arp'], desc: { fr: 'Correspondances IP et MAC des voisins', en: 'Neighbors’ IP to MAC mappings' } },
          { cells: same('ping <ip> source <interface>'), desc: { fr: 'Tester depuis une adresse source précise', en: 'Test from a specific source address' } },
          { cells: same('traceroute <ip>'), desc: { fr: 'Chemin suivi, saut par saut', en: 'Path taken, hop by hop' } },
        ],
      },
      {
        title: { fr: 'Routes statiques', en: 'Static routes' },
        rows: [
          { cells: ['ip route 0.0.0.0/0 10.0.0.1', 'ip route 0.0.0.0 0.0.0.0 10.0.0.1'], desc: { fr: 'Route par défaut', en: 'Default route' } },
          { cells: ['ip route 10.20.0.0/16 10.0.0.2', 'ip route 10.20.0.0 255.255.0.0 10.0.0.2'], desc: { fr: 'Route vers un réseau distant', en: 'Route to a remote network' } },
          { cells: ['ip route 10.20.0.0/16 10.0.0.3 250', 'ip route 10.20.0.0 255.255.0.0 10.0.0.3 250'], desc: { fr: 'Route flottante de secours (distance 250)', en: 'Floating backup route (distance 250)' } },
        ],
      },
      {
        title: { fr: 'OSPF', en: 'OSPF' },
        rows: [
          { cells: same('show ip ospf neighbor'), desc: { fr: 'Voisins et état (FULL attendu)', en: 'Neighbors and state (FULL expected)' } },
          { cells: same('show ip ospf interface brief'), desc: { fr: 'Interfaces OSPF, aire, coût, rôle DR/BDR', en: 'OSPF interfaces, area, cost, DR/BDR role' } },
          { cells: same('show ip ospf database'), desc: { fr: 'Base de données des LSA', en: 'LSA database' } },
          { cells: same('show ip route ospf'), desc: { fr: 'Routes apprises par OSPF', en: 'Routes learned through OSPF' } },
          { cells: ['router ospf 1\n   network 10.0.0.0/24 area 0', 'router ospf 1\n network 10.0.0.0 0.0.0.255 area 0'], desc: { fr: 'Activer OSPF sur les interfaces du réseau', en: 'Enable OSPF on the network’s interfaces' } },
          { cells: same('passive-interface <interface>'), desc: { fr: 'Annoncer le réseau sans former de voisinage', en: 'Advertise the network without forming adjacencies' } },
        ],
      },
    ],
  },
  {
    slug: 'bgp',
    badge: 'BGP',
    title: { fr: 'BGP', en: 'BGP' },
    intro: {
      fr: 'Sessions, routes reçues et annoncées, configuration de base et politiques.',
      en: 'Sessions, received and advertised routes, basic configuration and policies.',
    },
    head: [eos, ios],
    chapters: [
      { course: 'routing', chapter: 'bgp-basics' },
      { course: 'routing', chapter: 'bgp-attributes' },
      { course: 'routing', chapter: 'bgp-policies' },
    ],
    sections: [
      {
        title: { fr: 'Vérifications', en: 'Verification' },
        rows: [
          { cells: same('show ip bgp summary'), desc: { fr: 'Sessions, état et nombre de préfixes reçus', en: 'Sessions, state and number of prefixes received' } },
          { cells: same('show ip bgp'), desc: { fr: 'Table BGP : meilleur chemin marqué >', en: 'BGP table: best path marked >' } },
          { cells: same('show ip bgp <préfixe>'), desc: { fr: 'Tous les chemins d’un préfixe et leurs attributs', en: 'Every path of a prefix and its attributes' } },
          { cells: same('show ip bgp neighbors <ip>'), desc: { fr: 'Détail d’une session : timers, capacités, compteurs', en: 'Session details: timers, capabilities, counters' } },
          { cells: same('show ip bgp neighbors <ip> advertised-routes'), desc: { fr: 'Ce qu’on annonce à ce voisin', en: 'What is advertised to this neighbor' } },
          { cells: same('show ip bgp neighbors <ip> received-routes'), desc: { fr: 'Ce que le voisin envoie, avant filtrage (sur IOS : soft-reconfiguration inbound)', en: 'What the neighbor sends, before filtering (on IOS: soft-reconfiguration inbound)' } },
          { cells: same('clear ip bgp <ip> soft in'), desc: { fr: 'Réappliquer les politiques sans couper la session', en: 'Reapply policies without resetting the session' } },
        ],
      },
      {
        title: { fr: 'Configuration de base', en: 'Basic configuration' },
        rows: [
          { cells: same('router bgp 65001\n   router-id 10.0.0.1'), desc: { fr: 'Processus BGP et identifiant', en: 'BGP process and router ID' } },
          { cells: same('neighbor 192.0.2.2 remote-as 65002'), desc: { fr: 'Voisin eBGP (AS différent)', en: 'eBGP neighbor (different AS)' } },
          { cells: same('neighbor 10.0.0.2 remote-as 65001\nneighbor 10.0.0.2 update-source Loopback0'), desc: { fr: 'Voisin iBGP joint par sa loopback', en: 'iBGP neighbor reached through its loopback' } },
          { cells: ['network 10.10.0.0/16', 'network 10.10.0.0 mask 255.255.0.0'], desc: { fr: 'Annoncer un préfixe présent dans la table de routage', en: 'Advertise a prefix present in the routing table' } },
        ],
      },
      {
        title: { fr: 'Politiques', en: 'Policies' },
        rows: [
          { cells: same('ip prefix-list PL-CLIENT seq 10 permit 203.0.113.0/24'), desc: { fr: 'Liste de préfixes', en: 'Prefix list' } },
          { cells: same('route-map RM-CLIENT-IN permit 10\n   match ip address prefix-list PL-CLIENT\n   set local-preference 200'), desc: { fr: 'Préférer ces routes en sortie de l’AS', en: 'Prefer these routes to leave the AS' } },
          { cells: same('route-map RM-BACKUP-OUT permit 10\n   set as-path prepend 65001 65001'), desc: { fr: 'Rendre un lien moins attractif pour l’entrée', en: 'Make a link less attractive for inbound traffic' } },
          { cells: same('neighbor 192.0.2.2 route-map RM-CLIENT-IN in'), desc: { fr: 'Appliquer une politique à un voisin', en: 'Apply a policy to a neighbor' } },
        ],
      },
    ],
  },
  {
    slug: 'evpn-vxlan',
    badge: 'EVPN',
    title: { fr: 'EVPN-VXLAN (Arista)', en: 'EVPN-VXLAN (Arista)' },
    intro: {
      fr: 'Vérifier une fabric EVPN-VXLAN : underlay, sessions EVPN, routes par type, tunnels VXLAN et VRF.',
      en: 'Checking an EVPN-VXLAN fabric: underlay, EVPN sessions, routes by type, VXLAN tunnels and VRFs.',
    },
    head: [eos],
    chapters: [
      { course: 'datacenter', chapter: 'vxlan' },
      { course: 'datacenter', chapter: 'evpn' },
    ],
    tutorials: ['bgp-evpn-route-types'],
    sections: [
      {
        title: { fr: 'Underlay et sessions', en: 'Underlay and sessions' },
        rows: [
          { cells: ['show ip bgp summary'], desc: { fr: 'Sessions underlay (IPv4) vers les spines', en: 'Underlay (IPv4) sessions to the spines' } },
          { cells: ['show ip route <loopback distante>'], desc: { fr: 'La loopback VTEP d’en face est-elle joignable ?', en: 'Is the remote VTEP loopback reachable?' } },
          { cells: ['show bgp evpn summary'], desc: { fr: 'Sessions overlay EVPN et préfixes reçus', en: 'EVPN overlay sessions and prefixes received' } },
        ],
      },
      {
        title: { fr: 'Routes EVPN par type', en: 'EVPN routes by type' },
        rows: [
          { cells: ['show bgp evpn route-type auto-discovery'], desc: { fr: 'Type 1 : multihoming (ESI)', en: 'Type 1: multihoming (ESI)' } },
          { cells: ['show bgp evpn route-type mac-ip'], desc: { fr: 'Type 2 : adresses MAC et IP des machines', en: 'Type 2: hosts’ MAC and IP addresses' } },
          { cells: ['show bgp evpn route-type mac-ip <mac>'], desc: { fr: 'Où se trouve une machine précise', en: 'Where a specific host is' } },
          { cells: ['show bgp evpn route-type imet'], desc: { fr: 'Type 3 : VTEP intéressés par chaque VNI (BUM)', en: 'Type 3: VTEPs interested in each VNI (BUM)' } },
          { cells: ['show bgp evpn route-type ethernet-segment'], desc: { fr: 'Type 4 : élection du forwarder désigné', en: 'Type 4: designated forwarder election' } },
          { cells: ['show bgp evpn route-type ip-prefix ipv4'], desc: { fr: 'Type 5 : préfixes IP des VRF', en: 'Type 5: VRF IP prefixes' } },
        ],
      },
      {
        title: { fr: 'VXLAN et VRF', en: 'VXLAN and VRFs' },
        rows: [
          { cells: ['show interfaces vxlan 1'], desc: { fr: 'Interface VXLAN : source, VNI, VTEP distants', en: 'VXLAN interface: source, VNIs, remote VTEPs' } },
          { cells: ['show vxlan vtep'], desc: { fr: 'VTEP distants découverts', en: 'Discovered remote VTEPs' } },
          { cells: ['show vxlan vni'], desc: { fr: 'Correspondance VLAN, VNI et VRF', en: 'VLAN, VNI and VRF mapping' } },
          { cells: ['show vxlan address-table'], desc: { fr: 'MAC distantes, derrière quel VTEP', en: 'Remote MACs, behind which VTEP' } },
          { cells: ['show ip route vrf PROD'], desc: { fr: 'Table de routage d’une VRF', en: 'A VRF’s routing table' } },
          { cells: ['show ip arp vrf PROD'], desc: { fr: 'Voisins ARP dans une VRF', en: 'ARP neighbors in a VRF' } },
        ],
      },
    ],
  },
  {
    slug: 'troubleshooting',
    badge: '?!',
    title: { fr: 'Dépannage depuis un poste', en: 'Troubleshooting from a computer' },
    intro: {
      fr: 'Les vérifications dans l’ordre, du lien à l’application, depuis Windows ou Linux.',
      en: 'Checks in order, from the link to the application, from Windows or Linux.',
    },
    head: [{ fr: 'Windows', en: 'Windows' }, { fr: 'Linux / macOS', en: 'Linux / macOS' }],
    tutorials: ['troubleshooting'],
    sections: [
      {
        title: { fr: 'Dans l’ordre', en: 'In order' },
        rows: [
          { cells: ['Get-NetAdapter', 'ip link'], desc: { fr: '1. Lien : carte active, câble ou Wi-Fi connecté', en: '1. Link: adapter up, cable or Wi-Fi connected' } },
          { cells: ['ipconfig /all', 'ip addr'], desc: { fr: '2. Adresse, masque, DNS (169.254.x.x = pas de DHCP)', en: '2. Address, mask, DNS (169.254.x.x = no DHCP)' } },
          { cells: ['ipconfig /all', 'ip route'], desc: { fr: '3. Passerelle par défaut', en: '3. Default gateway' } },
          { cells: ['ping <passerelle>', 'ping -c 4 <passerelle>'], desc: { fr: '4. La passerelle répond-elle ?', en: '4. Does the gateway answer?' } },
          { cells: ['arp -a', 'ip neigh'], desc: { fr: '5. MAC de la passerelle dans le cache ARP', en: '5. Gateway MAC in the ARP cache' } },
          { cells: ['tracert <ip>', 'traceroute <ip>'], desc: { fr: '6. Où le chemin s’arrête-t-il ?', en: '6. Where does the path stop?' } },
          { cells: ['nslookup <nom>', 'dig <nom>'], desc: { fr: '7. Le nom se résout-il vers la bonne adresse ?', en: '7. Does the name resolve to the right address?' } },
          { cells: ['Test-NetConnection <ip> -Port 443', 'nc -vz <ip> 443'], desc: { fr: '8. Le port est-il ouvert de bout en bout ?', en: '8. Is the port open end to end?' } },
        ],
      },
      {
        title: { fr: 'Outils utiles', en: 'Useful tools' },
        rows: [
          { cells: ['ping -f -l 1472 <ip>', 'ping -M do -s 1472 <ip>'], desc: { fr: 'Tester la MTU (1472 + 28 = 1500)', en: 'Test the MTU (1472 + 28 = 1500)' } },
          { cells: ['ipconfig /flushdns', 'resolvectl flush-caches'], desc: { fr: 'Vider le cache DNS local', en: 'Flush the local DNS cache' } },
          { cells: ['ipconfig /release\nipconfig /renew', 'dhclient -r\ndhclient'], desc: { fr: 'Redemander une adresse DHCP', en: 'Request a new DHCP address' } },
          { cells: ['netstat -ano', 'ss -tulpn'], desc: { fr: 'Ports en écoute et connexions', en: 'Listening ports and connections' } },
          { cells: ['pktmon start --capture', 'tcpdump -ni eth0 host <ip>'], desc: { fr: 'Capturer le trafic', en: 'Capture traffic' } },
          { cells: ['curl -v https://<nom>', 'curl -v https://<nom>'], desc: { fr: 'Tester une application web, certificat compris', en: 'Test a web application, certificate included' } },
        ],
      },
    ],
  },
  {
    slug: 'subnetting',
    badge: '/26',
    title: { fr: 'Subnetting IPv4', en: 'IPv4 subnetting' },
    intro: {
      fr: 'Préfixes, masques, wildcards et nombre d’hôtes, plus les plages à connaître.',
      en: 'Prefixes, masks, wildcards and host counts, plus the ranges to know.',
    },
    head: [],
    chapters: [{ course: 'fundamentals', chapter: 'ipv4-subnetting' }],
    sections: [
      {
        title: { fr: 'Préfixes /16 à /32', en: 'Prefixes /16 to /32' },
        head: [
          { fr: 'Préfixe', en: 'Prefix' },
          { fr: 'Masque', en: 'Mask' },
          { fr: 'Wildcard', en: 'Wildcard' },
          { fr: 'Adresses', en: 'Addresses' },
          { fr: 'Hôtes', en: 'Hosts' },
        ],
        rows: Array.from({ length: 17 }, (_, i) => {
          const prefix = 16 + i;
          const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
          const dotted = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.');
          const size = 2 ** (32 - prefix);
          const hosts = prefix === 32 ? 1 : prefix === 31 ? 2 : size - 2;
          const num = (n: number): T => ({ fr: n.toLocaleString('fr-FR'), en: n.toLocaleString('en-US') });
          return { cells: [`/${prefix}`, dotted(mask), dotted(~mask >>> 0), num(size), num(hosts)] };
        }),
      },
      {
        title: { fr: 'Plages à connaître', en: 'Ranges to know' },
        head: [{ fr: 'Plage', en: 'Range' }],
        rows: [
          { cells: ['10.0.0.0/8'], desc: { fr: 'Privée (RFC 1918)', en: 'Private (RFC 1918)' } },
          { cells: ['172.16.0.0/12'], desc: { fr: 'Privée : 172.16.0.0 à 172.31.255.255', en: 'Private: 172.16.0.0 to 172.31.255.255' } },
          { cells: ['192.168.0.0/16'], desc: { fr: 'Privée', en: 'Private' } },
          { cells: ['100.64.0.0/10'], desc: { fr: 'CGNAT des opérateurs (RFC 6598)', en: 'Carrier-grade NAT (RFC 6598)' } },
          { cells: ['169.254.0.0/16'], desc: { fr: 'Link-local : pas de réponse DHCP', en: 'Link-local: no DHCP answer' } },
          { cells: ['127.0.0.0/8'], desc: { fr: 'Loopback', en: 'Loopback' } },
          { cells: ['192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24'], desc: { fr: 'Documentation (RFC 5737)', en: 'Documentation (RFC 5737)' } },
        ],
      },
      {
        title: { fr: 'Méthode rapide', en: 'Quick method' },
        head: [{ fr: 'Étape', en: 'Step' }],
        rows: [
          { cells: ['256 − octet'], desc: { fr: 'Taille du bloc dans l’octet intéressant : /26 → 256 − 192 = 64', en: 'Block size in the interesting octet: /26 → 256 − 192 = 64' } },
          { cells: ['0, 64, 128, 192'], desc: { fr: 'Les réseaux commencent aux multiples du bloc', en: 'Networks start at multiples of the block size' } },
          { cells: ['.37 → .0 à .63'], desc: { fr: 'Réseau .0, broadcast .63, hôtes .1 à .62', en: 'Network .0, broadcast .63, hosts .1 to .62' } },
        ],
      },
    ],
  },
];

export const cheatsheetUrl = (lang: Lang, slug: string) => (lang === 'fr' ? `/fiches/${slug}` : `/en/cheatsheets/${slug}`);

/** Fiches liées à un chapitre de formation */
export const cheatsheetsForChapter = (course: string, chapter: string) =>
  cheatsheets.filter((s) => s.chapters?.some((c) => c.course === course && c.chapter === chapter));
