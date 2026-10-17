import type { Lang } from '@/i18n/ui';
import type { TermId } from '@/data/glossary';

// Référence ports et protocoles (outil /outils/ports-protocols).
// Les numéros viennent du registre IANA, sauf quand `unofficial` est indiqué (port par défaut d'un logiciel).

export type Transport = 'tcp' | 'udp' | 'ip' | 'eth' | 'llc';

export const portCategories = ['basics', 'layer2', 'routing', 'overlay', 'admin', 'aaa', 'services', 'monitoring', 'vpn', 'apps'] as const;
export type PortCategory = (typeof portCategories)[number];

export interface PortEntry {
  name: string;
  expansion?: string;
  on: [Transport, number][];          // [transport, port] ; numéro de protocole IP, EtherType ou SAP LLC selon le transport
  category: PortCategory;
  description: Record<Lang, string>;
  note?: Record<Lang, string>;
  ref?: string;                       // RFC ou norme de référence
  cleartext?: boolean;                // trafic en clair (mots de passe ou données lisibles sur le réseau)
  unofficial?: boolean;               // port par défaut d'un logiciel, non attribué par l'IANA
  term?: TermId;                      // définition du glossaire en infobulle
}

export const ports: PortEntry[] = [
  // Fondamentaux
  {
    name: 'ICMP', expansion: 'Internet Control Message Protocol', on: [['ip', 1]], category: 'basics', ref: 'RFC 792', term: 'icmp',
    description: { fr: 'Messages de contrôle et d’erreur d’IPv4 : ping, destination injoignable, TTL expiré.', en: 'IPv4 control and error messages: ping, destination unreachable, TTL exceeded.' },
    note: { fr: 'Bloquer tout l’ICMP casse la découverte de MTU (PMTUD) : filtrez par type plutôt que tout refuser.', en: 'Blocking all ICMP breaks path MTU discovery (PMTUD): filter by type instead of denying everything.' },
  },
  {
    name: 'ICMPv6', on: [['ip', 58]], category: 'basics', ref: 'RFC 4443',
    description: { fr: 'ICMP pour IPv6, qui porte aussi la découverte des voisins (NDP) et l’annonce des routeurs.', en: 'ICMP for IPv6, which also carries neighbor discovery (NDP) and router advertisements.' },
    note: { fr: 'Indispensable au fonctionnement d’IPv6 : ne jamais le bloquer en entier.', en: 'Required for IPv6 to work: never block it entirely.' },
  },
  {
    name: 'TCP', expansion: 'Transmission Control Protocol', on: [['ip', 6]], category: 'basics', ref: 'RFC 9293', term: 'tcp',
    description: { fr: 'Transport fiable et ordonné, avec connexion (poignée de main SYN, SYN-ACK, ACK).', en: 'Reliable, ordered, connection-oriented transport (SYN, SYN-ACK, ACK handshake).' },
  },
  {
    name: 'UDP', expansion: 'User Datagram Protocol', on: [['ip', 17]], category: 'basics', ref: 'RFC 768', term: 'udp',
    description: { fr: 'Transport sans connexion ni retransmission : léger, utilisé par DNS, NTP, SNMP, VXLAN.', en: 'Connectionless transport with no retransmission: lightweight, used by DNS, NTP, SNMP, VXLAN.' },
  },
  {
    name: 'SCTP', expansion: 'Stream Control Transmission Protocol', on: [['ip', 132]], category: 'basics', ref: 'RFC 9260',
    description: { fr: 'Transport fiable multi-flux, surtout présent dans les réseaux mobiles (signalisation 4G et 5G).', en: 'Reliable multi-stream transport, mostly found in mobile networks (4G and 5G signaling).' },
  },
  {
    name: 'Traceroute', on: [['udp', 33434]], category: 'basics',
    description: { fr: 'Port de départ du traceroute Unix, incrémenté à chaque sonde (33434 à 33534 environ).', en: 'Starting port of Unix traceroute, incremented with each probe (about 33434 to 33534).' },
    note: { fr: 'Le tracert de Windows utilise de l’ICMP echo, pas de l’UDP.', en: 'Windows tracert uses ICMP echo, not UDP.' },
  },

  // Couche 2
  {
    name: 'IPv4', on: [['eth', 0x0800]], category: 'layer2',
    description: { fr: 'EtherType d’une trame qui transporte un paquet IPv4.', en: 'EtherType of a frame carrying an IPv4 packet.' },
  },
  {
    name: 'IPv6', on: [['eth', 0x86dd]], category: 'layer2',
    description: { fr: 'EtherType d’une trame qui transporte un paquet IPv6.', en: 'EtherType of a frame carrying an IPv6 packet.' },
  },
  {
    name: 'ARP', expansion: 'Address Resolution Protocol', on: [['eth', 0x0806]], category: 'layer2', ref: 'RFC 826', term: 'arp',
    description: { fr: 'Résolution d’une adresse IPv4 en adresse MAC sur le réseau local.', en: 'Resolves an IPv4 address to a MAC address on the local network.' },
  },
  {
    name: '802.1Q', on: [['eth', 0x8100]], category: 'layer2', ref: 'IEEE 802.1Q', term: 'vlan',
    description: { fr: 'Étiquette VLAN insérée dans la trame (TPID), suivie du numéro de VLAN sur 12 bits.', en: 'VLAN tag inserted in the frame (TPID), followed by the 12-bit VLAN ID.' },
  },
  {
    name: 'QinQ', on: [['eth', 0x88a8]], category: 'layer2', ref: 'IEEE 802.1ad',
    description: { fr: 'Étiquette de service d’un double tag VLAN, utilisée par les opérateurs.', en: 'Service tag of a double VLAN tag, used by carriers.' },
  },
  {
    name: 'LACP', expansion: 'Link Aggregation Control Protocol', on: [['eth', 0x8809]], category: 'layer2', ref: 'IEEE 802.1AX',
    description: { fr: 'Négociation des agrégats de liens (port-channel), via l’EtherType « slow protocols ».', en: 'Link aggregation (port-channel) negotiation, using the "slow protocols" EtherType.' },
  },
  {
    name: 'LLDP', expansion: 'Link Layer Discovery Protocol', on: [['eth', 0x88cc]], category: 'layer2', ref: 'IEEE 802.1AB', term: 'lldp',
    description: { fr: 'Annonce de l’identité de l’équipement à ses voisins directs : nom, port, capacités.', en: 'Advertises the device identity to its direct neighbors: name, port, capabilities.' },
  },
  {
    name: 'STP', expansion: 'Spanning Tree Protocol', on: [['llc', 0x42]], category: 'layer2', ref: 'IEEE 802.1D', term: 'stp',
    description: { fr: 'Les BPDU du spanning tree sont encapsulées en LLC, sans EtherType ni IP.', en: 'Spanning tree BPDUs are carried in LLC frames, with no EtherType and no IP.' },
  },
  {
    name: 'MPLS', expansion: 'Multiprotocol Label Switching', on: [['eth', 0x8847]], category: 'layer2', ref: 'RFC 3032',
    description: { fr: 'Trame qui transporte un paquet étiqueté MPLS (unicast).', en: 'Frame carrying an MPLS-labeled packet (unicast).' },
  },
  {
    name: 'MACsec', on: [['eth', 0x88e5]], category: 'layer2', ref: 'IEEE 802.1AE',
    description: { fr: 'Chiffrement des trames entre deux équipements voisins, lien par lien.', en: 'Frame encryption between two neighboring devices, link by link.' },
  },

  // Routage et plan de contrôle
  {
    name: 'BGP', expansion: 'Border Gateway Protocol', on: [['tcp', 179]], category: 'routing', ref: 'RFC 4271', term: 'bgp',
    description: { fr: 'Le protocole de routage d’Internet et des fabrics EVPN, entre pairs sur une session TCP.', en: 'The routing protocol of the Internet and of EVPN fabrics, between peers over a TCP session.' },
  },
  {
    name: 'OSPF', expansion: 'Open Shortest Path First', on: [['ip', 89]], category: 'routing', ref: 'RFC 2328', term: 'ospf',
    description: { fr: 'Protocole à état de liens, directement sur IP (OSPFv2 pour IPv4, OSPFv3 pour IPv6).', en: 'Link-state protocol, directly over IP (OSPFv2 for IPv4, OSPFv3 for IPv6).' },
    note: { fr: 'Multicast 224.0.0.5 (tous les routeurs OSPF) et 224.0.0.6 (DR et BDR).', en: 'Multicast 224.0.0.5 (all OSPF routers) and 224.0.0.6 (DR and BDR).' },
  },
  {
    name: 'IS-IS', expansion: 'Intermediate System to Intermediate System', on: [['llc', 0xfe]], category: 'routing', ref: 'ISO 10589',
    description: { fr: 'Protocole à état de liens transporté directement sur la couche 2, sans IP.', en: 'Link-state protocol carried directly over layer 2, without IP.' },
    note: { fr: 'Comme il ne passe pas par IP, une ACL IP ne le filtre pas.', en: 'Since it does not use IP, an IP ACL does not filter it.' },
  },
  {
    name: 'EIGRP', expansion: 'Enhanced Interior Gateway Routing Protocol', on: [['ip', 88]], category: 'routing', ref: 'RFC 7868',
    description: { fr: 'Protocole de routage à vecteur de distance avancé, historiquement propre à Cisco.', en: 'Advanced distance-vector routing protocol, historically Cisco-specific.' },
  },
  {
    name: 'RIP', expansion: 'Routing Information Protocol', on: [['udp', 520]], category: 'routing', ref: 'RFC 2453',
    description: { fr: 'Protocole à vecteur de distance, limité à 15 sauts. RIPng (IPv6) utilise UDP 521.', en: 'Distance-vector protocol, limited to 15 hops. RIPng (IPv6) uses UDP 521.' },
  },
  {
    name: 'BFD', expansion: 'Bidirectional Forwarding Detection', on: [['udp', 3784], ['udp', 3785], ['udp', 4784]], category: 'routing', ref: 'RFC 5881',
    description: { fr: 'Détection rapide de panne d’un lien ou d’un voisin, en quelques centaines de millisecondes.', en: 'Fast failure detection of a link or neighbor, within a few hundred milliseconds.' },
    note: { fr: '3784 : saut unique, 3785 : mode écho, 4784 : multi-saut (RFC 5883).', en: '3784: single hop, 3785: echo mode, 4784: multihop (RFC 5883).' },
  },
  {
    name: 'LDP', expansion: 'Label Distribution Protocol', on: [['udp', 646], ['tcp', 646]], category: 'routing', ref: 'RFC 5036',
    description: { fr: 'Distribution des étiquettes MPLS : découverte des voisins en UDP, session en TCP.', en: 'MPLS label distribution: neighbor discovery over UDP, session over TCP.' },
  },
  {
    name: 'PIM', expansion: 'Protocol Independent Multicast', on: [['ip', 103]], category: 'routing', ref: 'RFC 7761',
    description: { fr: 'Construction des arbres de diffusion multicast entre routeurs.', en: 'Builds multicast distribution trees between routers.' },
  },
  {
    name: 'IGMP', expansion: 'Internet Group Management Protocol', on: [['ip', 2]], category: 'routing', ref: 'RFC 3376',
    description: { fr: 'Abonnement d’un hôte à un groupe multicast auprès de son routeur.', en: 'Lets a host join a multicast group with its router.' },
  },
  {
    name: 'MSDP', expansion: 'Multicast Source Discovery Protocol', on: [['tcp', 639]], category: 'routing', ref: 'RFC 3618',
    description: { fr: 'Échange des sources multicast actives entre points de rendez-vous PIM.', en: 'Shares active multicast sources between PIM rendezvous points.' },
  },
  {
    name: 'RPKI-RTR', on: [['tcp', 323]], category: 'routing', ref: 'RFC 8210', term: 'rpki',
    description: { fr: 'Le routeur récupère auprès d’un validateur la liste des origines BGP autorisées (ROA).', en: 'The router fetches the list of authorized BGP origins (ROAs) from a validator.' },
    note: { fr: 'Beaucoup de validateurs écoutent par défaut sur un autre port (3323, 8282) : vérifiez leur documentation.', en: 'Many validators listen on another port by default (3323, 8282): check their documentation.' },
  },

  // Redondance et encapsulation
  {
    name: 'VRRP', expansion: 'Virtual Router Redundancy Protocol', on: [['ip', 112]], category: 'overlay', ref: 'RFC 9568', term: 'vrrp',
    description: { fr: 'Passerelle par défaut virtuelle partagée entre plusieurs routeurs, multicast 224.0.0.18.', en: 'Virtual default gateway shared between several routers, multicast 224.0.0.18.' },
  },
  {
    name: 'HSRP', expansion: 'Hot Standby Router Protocol', on: [['udp', 1985]], category: 'overlay',
    description: { fr: 'Équivalent Cisco de VRRP (224.0.0.2 en v1, 224.0.0.102 en v2).', en: 'Cisco equivalent of VRRP (224.0.0.2 in v1, 224.0.0.102 in v2).' },
  },
  {
    name: 'GLBP', expansion: 'Gateway Load Balancing Protocol', on: [['udp', 3222]], category: 'overlay',
    description: { fr: 'Passerelle redondante Cisco qui répartit aussi la charge entre les routeurs.', en: 'Cisco redundant gateway that also load-balances across routers.' },
  },
  {
    name: 'VXLAN', expansion: 'Virtual Extensible LAN', on: [['udp', 4789]], category: 'overlay', ref: 'RFC 7348', term: 'vxlan',
    description: { fr: 'Transport de trames Ethernet dans de l’UDP, base des fabrics EVPN.', en: 'Carries Ethernet frames inside UDP, the basis of EVPN fabrics.' },
    note: { fr: 'L’en-tête ajoute 50 octets : prévoir une MTU d’au moins 1550 dans l’underlay.', en: 'The header adds 50 bytes: plan for an underlay MTU of at least 1550.' },
  },
  {
    name: 'Geneve', on: [['udp', 6081]], category: 'overlay', ref: 'RFC 8926',
    description: { fr: 'Encapsulation extensible, successeur de VXLAN dans plusieurs solutions de virtualisation.', en: 'Extensible encapsulation, VXLAN successor in several virtualization platforms.' },
  },
  {
    name: 'GRE', expansion: 'Generic Routing Encapsulation', on: [['ip', 47]], category: 'overlay', ref: 'RFC 2784',
    description: { fr: 'Tunnel générique qui encapsule un paquet dans un autre, sans chiffrement.', en: 'Generic tunnel wrapping a packet inside another one, with no encryption.' },
    cleartext: true,
  },

  // Administration
  {
    name: 'SSH', expansion: 'Secure Shell', on: [['tcp', 22]], category: 'admin', ref: 'RFC 4253',
    description: { fr: 'Accès en ligne de commande chiffré. Sert aussi à SCP et SFTP pour copier des fichiers.', en: 'Encrypted command-line access. Also carries SCP and SFTP for file transfers.' },
  },
  {
    name: 'Telnet', on: [['tcp', 23]], category: 'admin', ref: 'RFC 854', cleartext: true,
    description: { fr: 'Accès en ligne de commande historique, entièrement en clair.', en: 'Legacy command-line access, entirely in cleartext.' },
    note: { fr: 'Identifiants lisibles par quiconque capture le trafic : remplacez-le par SSH.', en: 'Credentials are readable by anyone capturing traffic: replace it with SSH.' },
  },
  {
    name: 'SNMP', expansion: 'Simple Network Management Protocol', on: [['udp', 161]], category: 'admin', ref: 'RFC 3411',
    description: { fr: 'Interrogation des compteurs et de l’état des équipements par le serveur de supervision.', en: 'Polling of device counters and state by the monitoring server.' },
    note: { fr: 'v1 et v2c envoient la communauté en clair : préférez SNMPv3 avec authentification et chiffrement.', en: 'v1 and v2c send the community in cleartext: prefer SNMPv3 with authentication and encryption.' },
  },
  {
    name: 'NETCONF', on: [['tcp', 830]], category: 'admin', ref: 'RFC 6242',
    description: { fr: 'Configuration structurée (YANG, XML) au-dessus de SSH, avec transactions et retour arrière.', en: 'Structured configuration (YANG, XML) over SSH, with transactions and rollback.' },
  },
  {
    name: 'gNMI', expansion: 'gRPC Network Management Interface', on: [['tcp', 9339]], category: 'admin',
    description: { fr: 'Configuration et télémétrie en streaming sur gRPC, modèles OpenConfig.', en: 'Configuration and streaming telemetry over gRPC, OpenConfig models.' },
    note: { fr: 'Arista EOS écoute par défaut sur 6030.', en: 'Arista EOS listens on 6030 by default.' },
  },
  {
    name: 'HTTPS', on: [['tcp', 443]], category: 'admin', ref: 'RFC 9110',
    description: { fr: 'Web chiffré par TLS, utilisé aussi par les API REST, RESTCONF et eAPI d’Arista.', en: 'TLS-encrypted web, also used by REST APIs, RESTCONF and Arista eAPI.' },
    term: 'api',
  },
  {
    name: 'HTTP', on: [['tcp', 80]], category: 'admin', ref: 'RFC 9110', cleartext: true,
    description: { fr: 'Web sans chiffrement. Sur un équipement, à désactiver ou à rediriger vers HTTPS.', en: 'Unencrypted web. On a device, disable it or redirect it to HTTPS.' },
  },
  {
    name: 'TFTP', expansion: 'Trivial File Transfer Protocol', on: [['udp', 69]], category: 'admin', ref: 'RFC 1350', cleartext: true,
    description: { fr: 'Transfert de fichiers minimaliste sans authentification, encore utilisé pour le ZTP et les images.', en: 'Minimal file transfer with no authentication, still used for ZTP and images.' },
    term: 'ztp',
  },
  {
    name: 'FTP', expansion: 'File Transfer Protocol', on: [['tcp', 21], ['tcp', 20]], category: 'admin', ref: 'RFC 959', cleartext: true,
    description: { fr: '21 pour les commandes, 20 pour les données en mode actif. En mode passif, le port de données est négocié.', en: '21 for commands, 20 for data in active mode. In passive mode, the data port is negotiated.' },
    note: { fr: 'Identifiants en clair : préférez SFTP ou SCP (TCP 22).', en: 'Cleartext credentials: prefer SFTP or SCP (TCP 22).' },
  },
  {
    name: 'RDP', expansion: 'Remote Desktop Protocol', on: [['tcp', 3389], ['udp', 3389]], category: 'admin',
    description: { fr: 'Bureau à distance Windows, souvent utilisé pour rejoindre un bastion.', en: 'Windows remote desktop, often used to reach a jump host.' },
    note: { fr: 'Ne jamais l’exposer directement sur Internet.', en: 'Never expose it directly to the Internet.' },
    term: 'bastion',
  },

  // Authentification
  {
    name: 'TACACS+', on: [['tcp', 49]], category: 'aaa', ref: 'RFC 8907', term: 'tacacs',
    description: { fr: 'Authentification, autorisation commande par commande et traçabilité des administrateurs.', en: 'Authentication, per-command authorization and accounting for administrators.' },
  },
  {
    name: 'RADIUS', on: [['udp', 1812], ['udp', 1813]], category: 'aaa', ref: 'RFC 2865', term: 'aaa',
    description: { fr: '1812 pour l’authentification, 1813 pour la traçabilité (accounting). Utilisé pour le 802.1X et le VPN.', en: '1812 for authentication, 1813 for accounting. Used for 802.1X and VPN.' },
    note: { fr: 'Les anciens équipements utilisent encore 1645 et 1646.', en: 'Older devices still use 1645 and 1646.' },
  },
  {
    name: 'RadSec', on: [['tcp', 2083]], category: 'aaa', ref: 'RFC 6614',
    description: { fr: 'RADIUS transporté dans TLS, pour traverser un réseau non maîtrisé.', en: 'RADIUS carried inside TLS, to cross an untrusted network.' },
  },
  {
    name: 'LDAP', expansion: 'Lightweight Directory Access Protocol', on: [['tcp', 389]], category: 'aaa', ref: 'RFC 4511',
    description: { fr: 'Interrogation d’un annuaire (Active Directory, OpenLDAP), en clair sauf avec StartTLS.', en: 'Directory queries (Active Directory, OpenLDAP), in cleartext unless StartTLS is used.' },
    cleartext: true,
  },
  {
    name: 'LDAPS', on: [['tcp', 636]], category: 'aaa',
    description: { fr: 'LDAP chiffré par TLS dès la connexion.', en: 'LDAP encrypted with TLS from the start.' },
  },
  {
    name: 'Kerberos', on: [['tcp', 88], ['udp', 88]], category: 'aaa', ref: 'RFC 4120',
    description: { fr: 'Authentification par tickets, au cœur d’Active Directory.', en: 'Ticket-based authentication, at the heart of Active Directory.' },
  },

  // Services d'infrastructure
  {
    name: 'DNS', expansion: 'Domain Name System', on: [['udp', 53], ['tcp', 53]], category: 'services', ref: 'RFC 1035',
    description: { fr: 'Résolution de noms. UDP pour la plupart des requêtes, TCP pour les grosses réponses et les transferts de zone.', en: 'Name resolution. UDP for most queries, TCP for large answers and zone transfers.' },
    note: { fr: 'Autoriser seulement UDP 53 casse les réponses DNSSEC volumineuses : ouvrez aussi TCP.', en: 'Allowing only UDP 53 breaks large DNSSEC answers: open TCP as well.' },
  },
  {
    name: 'DoT', expansion: 'DNS over TLS', on: [['tcp', 853]], category: 'services', ref: 'RFC 7858',
    description: { fr: 'DNS chiffré par TLS. DNS over QUIC (RFC 9250) utilise UDP 853, DNS over HTTPS le port 443.', en: 'DNS encrypted with TLS. DNS over QUIC (RFC 9250) uses UDP 853, DNS over HTTPS uses port 443.' },
  },
  {
    name: 'DHCP', expansion: 'Dynamic Host Configuration Protocol', on: [['udp', 67], ['udp', 68]], category: 'services', ref: 'RFC 2131', term: 'dhcp',
    description: { fr: '67 côté serveur (et relais), 68 côté client.', en: '67 on the server (and relay) side, 68 on the client side.' },
  },
  {
    name: 'DHCPv6', on: [['udp', 546], ['udp', 547]], category: 'services', ref: 'RFC 8415',
    description: { fr: '546 côté client, 547 côté serveur et relais.', en: '546 on the client side, 547 on the server and relay side.' },
  },
  {
    name: 'NTP', expansion: 'Network Time Protocol', on: [['udp', 123]], category: 'services', ref: 'RFC 5905',
    description: { fr: 'Synchronisation de l’heure : sans elle, logs incohérents et certificats refusés.', en: 'Time synchronization: without it, logs are inconsistent and certificates get rejected.' },
  },
  {
    name: 'NTS-KE', expansion: 'Network Time Security Key Establishment', on: [['tcp', 4460]], category: 'services', ref: 'RFC 8915',
    description: { fr: 'Échange de clés TLS qui permet ensuite d’authentifier les réponses NTP.', en: 'TLS key exchange used to then authenticate NTP responses.' },
  },
  {
    name: 'PTP', expansion: 'Precision Time Protocol', on: [['udp', 319], ['udp', 320]], category: 'services', ref: 'IEEE 1588',
    description: { fr: 'Synchronisation à la microseconde (finance, télécoms, broadcast). 319 pour les événements, 320 pour le reste.', en: 'Microsecond-level synchronization (finance, telecom, broadcast). 319 for event messages, 320 for general ones.' },
  },

  // Supervision et journaux
  {
    name: 'SNMP trap', on: [['udp', 162]], category: 'monitoring', ref: 'RFC 3411',
    description: { fr: 'Alertes envoyées par l’équipement vers le serveur de supervision, sans attendre d’être interrogé.', en: 'Alerts pushed by the device to the monitoring server, without waiting to be polled.' },
  },
  {
    name: 'Syslog', on: [['udp', 514]], category: 'monitoring', ref: 'RFC 5426', cleartext: true,
    description: { fr: 'Envoi des journaux vers un serveur central. En UDP, un message perdu n’est jamais renvoyé.', en: 'Sends logs to a central server. Over UDP, a lost message is never resent.' },
  },
  {
    name: 'Syslog TLS', on: [['tcp', 6514]], category: 'monitoring', ref: 'RFC 5425',
    description: { fr: 'Syslog transporté en TCP et chiffré par TLS.', en: 'Syslog carried over TCP and encrypted with TLS.' },
  },
  {
    name: 'IPFIX', expansion: 'IP Flow Information Export', on: [['udp', 4739], ['tcp', 4739]], category: 'monitoring', ref: 'RFC 7011',
    description: { fr: 'Export de flux normalisé, issu de NetFlow v9.', en: 'Standard flow export, derived from NetFlow v9.' },
  },
  {
    name: 'NetFlow', on: [['udp', 2055]], category: 'monitoring', unofficial: true,
    description: { fr: 'Export de flux Cisco (v5, v9). Le port se configure sur l’équipement, 2055 est une convention.', en: 'Cisco flow export (v5, v9). The port is configured on the device, 2055 is a convention.' },
  },
  {
    name: 'sFlow', on: [['udp', 6343]], category: 'monitoring',
    description: { fr: 'Échantillonnage de paquets et de compteurs, courant sur les commutateurs.', en: 'Packet and counter sampling, common on switches.' },
  },
  {
    name: 'Zabbix', on: [['tcp', 10050], ['tcp', 10051]], category: 'monitoring',
    description: { fr: '10050 pour l’agent interrogé par le serveur, 10051 pour le serveur qui reçoit les données actives.', en: '10050 for the agent polled by the server, 10051 for the server receiving active data.' },
  },
  {
    name: 'Prometheus', on: [['tcp', 9090]], category: 'monitoring', unofficial: true,
    description: { fr: 'Interface web et API du serveur Prometheus.', en: 'Web interface and API of the Prometheus server.' },
  },
  {
    name: 'node_exporter', on: [['tcp', 9100]], category: 'monitoring', unofficial: true,
    description: { fr: 'Métriques système d’une machine Linux, collectées par Prometheus.', en: 'System metrics of a Linux machine, scraped by Prometheus.' },
    note: { fr: 'Même port que l’impression réseau directe (JetDirect) : pas de conflit, mais une source de confusion dans les règles de pare-feu.', en: 'Same port as raw network printing (JetDirect): no conflict, but a source of confusion in firewall rules.' },
  },
  {
    name: 'Grafana', on: [['tcp', 3000]], category: 'monitoring', unofficial: true,
    description: { fr: 'Interface web des tableaux de bord.', en: 'Dashboard web interface.' },
  },

  // VPN et sécurité
  {
    name: 'IKE', expansion: 'Internet Key Exchange', on: [['udp', 500]], category: 'vpn', ref: 'RFC 7296',
    description: { fr: 'Négociation des clés et des paramètres d’un tunnel IPsec.', en: 'Negotiates the keys and parameters of an IPsec tunnel.' },
  },
  {
    name: 'IPsec NAT-T', on: [['udp', 4500]], category: 'vpn', ref: 'RFC 3948', term: 'nat',
    description: { fr: 'IKE et ESP encapsulés dans UDP quand un NAT est détecté sur le chemin.', en: 'IKE and ESP wrapped in UDP when NAT is detected on the path.' },
  },
  {
    name: 'ESP', expansion: 'Encapsulating Security Payload', on: [['ip', 50]], category: 'vpn', ref: 'RFC 4303',
    description: { fr: 'Le trafic chiffré d’un tunnel IPsec. Il n’a pas de port : c’est un protocole IP à part entière.', en: 'The encrypted traffic of an IPsec tunnel. It has no port: it is an IP protocol of its own.' },
    note: { fr: 'Ouvrir UDP 500 sans le protocole 50 donne un tunnel qui monte mais ne passe aucun trafic.', en: 'Opening UDP 500 without protocol 50 gives a tunnel that comes up but carries no traffic.' },
  },
  {
    name: 'AH', expansion: 'Authentication Header', on: [['ip', 51]], category: 'vpn', ref: 'RFC 4302',
    description: { fr: 'Intégrité IPsec sans chiffrement, incompatible avec le NAT. Rarement utilisé.', en: 'IPsec integrity without encryption, incompatible with NAT. Rarely used.' },
  },
  {
    name: 'WireGuard', on: [['udp', 51820]], category: 'vpn', unofficial: true,
    description: { fr: 'VPN moderne et minimaliste. Le port se choisit, 51820 est celui de la documentation.', en: 'Modern, minimal VPN. The port is configurable, 51820 is the one from the documentation.' },
  },
  {
    name: 'OpenVPN', on: [['udp', 1194], ['tcp', 1194]], category: 'vpn',
    description: { fr: 'VPN basé sur TLS, en UDP de préférence, en TCP pour traverser les réseaux filtrés.', en: 'TLS-based VPN, preferably over UDP, over TCP to get through filtered networks.' },
  },
  {
    name: 'L2TP', expansion: 'Layer 2 Tunneling Protocol', on: [['udp', 1701]], category: 'vpn', ref: 'RFC 3931', cleartext: true,
    description: { fr: 'Tunnel sans chiffrement, généralement protégé par IPsec (L2TP/IPsec).', en: 'Unencrypted tunnel, usually protected by IPsec (L2TP/IPsec).' },
  },

  // Applications courantes
  {
    name: 'HTTP/3', on: [['udp', 443]], category: 'apps', ref: 'RFC 9114',
    description: { fr: 'Web sur QUIC. Si UDP 443 est bloqué, le navigateur revient à HTTPS sur TCP.', en: 'Web over QUIC. If UDP 443 is blocked, the browser falls back to HTTPS over TCP.' },
  },
  {
    name: 'SMTP', expansion: 'Simple Mail Transfer Protocol', on: [['tcp', 25]], category: 'apps', ref: 'RFC 5321',
    description: { fr: 'Échange de courriels entre serveurs.', en: 'Email exchange between servers.' },
  },
  {
    name: 'Submission', on: [['tcp', 587], ['tcp', 465]], category: 'apps', ref: 'RFC 8314',
    description: { fr: 'Envoi d’un courriel par un client authentifié : 587 avec STARTTLS, 465 en TLS direct.', en: 'Email sent by an authenticated client: 587 with STARTTLS, 465 with implicit TLS.' },
  },
  {
    name: 'IMAPS', on: [['tcp', 993]], category: 'apps', ref: 'RFC 8314',
    description: { fr: 'Lecture des courriels sur le serveur, chiffrée par TLS.', en: 'Reading email on the server, encrypted with TLS.' },
  },
  {
    name: 'SMB', expansion: 'Server Message Block', on: [['tcp', 445]], category: 'apps',
    description: { fr: 'Partage de fichiers Windows.', en: 'Windows file sharing.' },
    note: { fr: 'À ne jamais exposer sur Internet : c’est la porte d’entrée de nombreux rançongiciels.', en: 'Never expose it to the Internet: it is the entry point of many ransomware attacks.' },
  },
];

const hex = (n: number, digits: number) => `0x${n.toString(16).toUpperCase().padStart(digits, '0')}`;

// Libellé du numéro selon le transport : 179, 89, 0x88CC, 0xFE
export const formatNumber = (transport: Transport, n: number) =>
  transport === 'eth' ? hex(n, 4) : transport === 'llc' ? hex(n, 2) : String(n);
