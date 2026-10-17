import type { Lang } from '@/i18n/ui';

export interface GlossaryEntry {
  term: string;                       // texte affiché par défaut : <Term id="nat" /> → "NAT"
  expansion?: string;                 // forme développée de l'acronyme, en gras dans l'infobulle
  definition: Record<Lang, string>;   // une ou deux phrases, pas plus
}

// Clés en minuscules et en anglais, comme les slugs. Ordre alphabétique.
export const glossary = {
  aaa: {
    term: 'AAA',
    expansion: 'Authentication, Authorization, Accounting',
    definition: {
      fr: "Le cadre qui contrôle l'accès aux équipements : qui se connecte (authentification), ce qu'il a le droit de faire (autorisation), et la trace de ce qu'il a fait (traçabilité).",
      en: "The framework controlling access to devices: who logs in (authentication), what they may do (authorization), and the record of what they did (accounting).",
    },
  },
  api: {
    term: 'API',
    expansion: 'Application Programming Interface',
    definition: {
      fr: "Interface qui permet à un programme de piloter un autre logiciel ou un équipement, par exemple eAPI sur Arista ou l'API REST de NetBox.",
      en: "Interface that lets a program drive another piece of software or a device, for example eAPI on Arista or NetBox's REST API.",
    },
  },
  arp: {
    term: 'ARP',
    expansion: 'Address Resolution Protocol',
    definition: {
      fr: "Protocole qui trouve l'adresse MAC correspondant à une adresse IPv4 sur le réseau local, par une requête diffusée en broadcast.",
      en: 'Protocol that finds the MAC address matching an IPv4 address on the local network, using a broadcast request.',
    },
  },
  as: {
    term: 'AS',
    expansion: 'Autonomous System',
    definition: {
      fr: "Système autonome : ensemble de réseaux géré par une même organisation, avec une politique de routage commune, identifié par un numéro (ASN).",
      en: "Autonomous system: a set of networks run by one organization with a common routing policy, identified by a number (ASN).",
    },
  },
  avd: {
    term: 'AVD',
    expansion: 'Arista Validated Designs',
    definition: {
      fr: "Collection Ansible d'Arista qui génère les configurations complètes d'une fabric (et sa documentation) à partir d'un modèle de données YAML.",
      en: "Arista Ansible collection that generates the complete configurations of a fabric (and its documentation) from a YAML data model.",
    },
  },
  bastion: {
    term: 'Bastion',
    definition: {
      fr: "Serveur d’accès unique (jump host) par lequel passent toutes les connexions d’administration : authentification forte, droits par personne et enregistrement des sessions.",
      en: 'Single access server (jump host) that every administrative connection goes through: strong authentication, per-person rights and session recording.',
    },
  },
  bgp: {
    term: 'BGP',
    expansion: 'Border Gateway Protocol',
    definition: {
      fr: "Protocole de routage qui échange des préfixes entre systèmes autonomes (AS). C'est lui qui fait tenir Internet, et il sert aussi de plan de contrôle aux fabrics EVPN.",
      en: 'Routing protocol that exchanges prefixes between autonomous systems (AS). It holds the Internet together and also serves as the control plane of EVPN fabrics.',
    },
  },
  bpdu: {
    term: 'BPDU',
    expansion: 'Bridge Protocol Data Unit',
    definition: {
      fr: "Message échangé entre switches par le protocole Spanning Tree pour élire le root bridge et détecter les boucles.",
      en: "Message exchanged between switches by Spanning Tree to elect the root bridge and detect loops.",
    },
  },
  ca: {
    term: 'CA',
    expansion: 'Certificate Authority',
    definition: {
      fr: "Autorité de certification : entité de confiance qui signe les certificats. Un navigateur accepte un certificat s'il remonte, de signature en signature, jusqu'à une autorité racine qu'il connaît.",
      en: "Certificate authority: trusted entity that signs certificates. A browser accepts a certificate if it chains, signature by signature, up to a root authority it knows.",
    },
  },
  cdp: {
    term: 'CDP',
    expansion: 'Cisco Discovery Protocol',
    definition: {
      fr: "Protocole propriétaire Cisco par lequel un équipement annonce son identité (nom, modèle, port, adresse) à ses voisins directs.",
      en: "Cisco proprietary protocol through which a device advertises its identity (name, model, port, address) to its directly connected neighbors.",
    },
  },
  cicd: {
    term: 'CI/CD',
    expansion: 'Continuous Integration / Continuous Delivery',
    definition: {
      fr: "Chaîne d'automatisation (GitLab CI, GitHub Actions…) qui teste et déploie automatiquement chaque changement poussé dans Git, ou exécute des tâches planifiées.",
      en: "Automation pipeline (GitLab CI, GitHub Actions…) that automatically tests and deploys every change pushed to Git, or runs scheduled jobs.",
    },
  },
  cidr: {
    term: 'CIDR',
    expansion: 'Classless Inter-Domain Routing',
    definition: {
      fr: "Notation qui indique la taille d'un réseau par le nombre de bits du préfixe, par exemple /24, au lieu des anciennes classes A, B et C.",
      en: 'Notation that gives the size of a network as the number of prefix bits, for example /24, instead of the old A, B and C classes.',
    },
  },
  ddos: {
    term: 'DDoS',
    expansion: 'Distributed Denial of Service',
    definition: {
      fr: "Attaque par déni de service distribuée : des milliers de machines envoient du trafic en même temps pour saturer un lien, un serveur ou une application.",
      en: "Distributed denial-of-service attack: thousands of machines send traffic at once to saturate a link, a server or an application.",
    },
  },
  dhcp: {
    term: 'DHCP',
    expansion: 'Dynamic Host Configuration Protocol',
    definition: {
      fr: "Protocole qui attribue automatiquement aux machines leur adresse IP, leur masque, leur passerelle et leurs serveurs DNS.",
      en: "Protocol that automatically assigns hosts their IP address, mask, gateway and DNS servers.",
    },
  },
  ebgp: {
    term: 'eBGP',
    expansion: 'External BGP',
    definition: {
      fr: "Session BGP entre deux systèmes autonomes différents, par exemple entre une entreprise et son opérateur.",
      en: "BGP session between two different autonomous systems, for example between a company and its ISP.",
    },
  },
  evpn: {
    term: 'EVPN',
    expansion: 'Ethernet VPN',
    definition: {
      fr: 'Extension de BGP qui annonce les adresses MAC et IP des hôtes, pour construire des réseaux de niveau 2 et 3 étendus sans inondation excessive.',
      en: 'BGP extension that advertises host MAC and IP addresses, to build stretched layer 2 and layer 3 networks without excessive flooding.',
    },
  },
  fcs: {
    term: 'FCS',
    expansion: 'Frame Check Sequence',
    definition: {
      fr: "Les 4 derniers octets d'une trame Ethernet : un code de contrôle (CRC-32) qui permet de détecter une trame abîmée pendant le transport.",
      en: "The last 4 bytes of an Ethernet frame: a check code (CRC-32) used to detect a frame damaged in transit.",
    },
  },
  fib: {
    term: 'FIB',
    expansion: 'Forwarding Information Base',
    definition: {
      fr: "Table de transfert : la copie des meilleures routes programmée dans le matériel du routeur, utilisée pour chaque paquet.",
      en: "Forwarding table: the copy of the best routes programmed into the router hardware, used for every packet.",
    },
  },
  gitops: {
    term: 'GitOps',
    definition: {
      fr: "Pratique qui fait de Git la référence de l'état d'une infrastructure : chaque changement passe par un commit, relu et tracé, et un pipeline l'applique ou le constate.",
      en: "Practice that makes Git the reference for an infrastructure's state: every change goes through a reviewed, traceable commit, and a pipeline applies or records it.",
    },
  },
  gslb: {
    term: 'GSLB',
    expansion: 'Global Server Load Balancing',
    definition: {
      fr: "Répartition de charge entre plusieurs sites, le plus souvent par le DNS : la réponse renvoie l'adresse du data center disponible ou le plus proche.",
      en: "Load balancing across several sites, usually through DNS: the answer returns the address of the available or nearest data center.",
    },
  },
  hsts: {
    term: 'HSTS',
    expansion: 'HTTP Strict Transport Security',
    definition: {
      fr: "En-tête HTTP qui demande au navigateur de n'utiliser que HTTPS pour ce site pendant une durée donnée, même si l'utilisateur tape http://.",
      en: "HTTP header telling the browser to use only HTTPS for this site for a given time, even if the user types http://.",
    },
  },
  http: {
    term: 'HTTP',
    expansion: 'Hypertext Transfer Protocol',
    definition: {
      fr: "Protocole du web : un client envoie une requête (méthode, chemin, en-têtes) et le serveur renvoie une réponse avec un code (200, 404…). HTTPS est HTTP chiffré par TLS.",
      en: "The web protocol: a client sends a request (method, path, headers) and the server returns a response with a status code (200, 404…). HTTPS is HTTP encrypted with TLS.",
    },
  },
  ibgp: {
    term: 'iBGP',
    expansion: 'Internal BGP',
    definition: {
      fr: "Session BGP entre deux routeurs d'un même système autonome, pour partager les routes apprises de l'extérieur.",
      en: "BGP session between two routers of the same autonomous system, to share routes learned from outside.",
    },
  },
  icmp: {
    term: 'ICMP',
    expansion: 'Internet Control Message Protocol',
    definition: {
      fr: "Protocole de messages de contrôle et d'erreur d'IP. C'est lui qu'utilisent ping (echo request / echo reply) et traceroute.",
      en: "IP's control and error message protocol. It is what ping (echo request / echo reply) and traceroute rely on.",
    },
  },
  idempotence: {
    term: 'Idempotence',
    definition: {
      fr: "Propriété d'une opération qu'on peut relancer sans risque : appliquée une ou dix fois, elle mène au même résultat, et ne change rien si l'état voulu est déjà atteint.",
      en: "Property of an operation that can safely be run again: applied once or ten times, it leads to the same result, and changes nothing if the desired state is already reached.",
    },
  },
  igp: {
    term: 'IGP',
    expansion: 'Interior Gateway Protocol',
    definition: {
      fr: "Protocole de routage utilisé à l'intérieur d'un système autonome, comme OSPF ou IS-IS.",
      en: "Routing protocol used inside an autonomous system, such as OSPF or IS-IS.",
    },
  },
  ipam: {
    term: 'IPAM',
    expansion: 'IP Address Management',
    definition: {
      fr: "Registre des préfixes, adresses IP et VLAN d'un réseau, qui sait ce qui est libre et refuse les doublons, comme NetBox ou Infoblox.",
      en: 'Registry of the prefixes, IP addresses and VLANs of a network, which knows what is free and rejects duplicates, such as NetBox or Infoblox.',
    },
  },
  jinja: {
    term: 'Jinja2',
    definition: {
      fr: "Langage de gabarits utilisé par Ansible : un modèle de configuration avec des variables et des boucles, rempli à partir des données.",
      en: "Templating language used by Ansible: a configuration template with variables and loops, filled in from data.",
    },
  },
  lan: {
    term: 'LAN',
    expansion: 'Local Area Network',
    definition: {
      fr: "Réseau local : les machines d'un même site (bureau, étage, salle serveur) reliées par des switches, en général en Ethernet.",
      en: "Local network: the machines of a single site (office, floor, server room) connected by switches, usually over Ethernet.",
    },
  },
  lldp: {
    term: 'LLDP',
    expansion: 'Link Layer Discovery Protocol',
    definition: {
      fr: "Protocole standard (IEEE 802.1AB) par lequel un équipement annonce son identité à ses voisins directs : qui est branché sur quel port.",
      en: "Standard protocol (IEEE 802.1AB) through which a device advertises its identity to its direct neighbors: what is plugged into which port.",
    },
  },
  lsa: {
    term: 'LSA',
    expansion: 'Link State Advertisement',
    definition: {
      fr: "Message OSPF par lequel un routeur décrit ses liens. L'ensemble des LSA forme la base topologique (LSDB), identique sur tous les routeurs d'une zone.",
      en: "OSPF message in which a router describes its links. All LSAs together form the topology database (LSDB), identical on every router of an area.",
    },
  },
  mac: {
    term: 'MAC',
    expansion: 'Media Access Control',
    definition: {
      fr: "Adresse physique de 48 bits gravée dans chaque carte réseau, notée par exemple 00:1c:73:aa:bb:cc. Elle sert à livrer les trames sur le réseau local.",
      en: "48-bit physical address burned into each network card, written for example 00:1c:73:aa:bb:cc. It is used to deliver frames on the local network.",
    },
  },
  med: {
    term: 'MED',
    expansion: 'Multi-Exit Discriminator',
    definition: {
      fr: "Attribut BGP qui suggère à un AS voisin, relié par plusieurs liens, lequel utiliser pour nous joindre. Le plus bas est préféré.",
      en: "BGP attribute suggesting to a neighbor AS connected over several links which one to use to reach us. Lower is preferred.",
    },
  },
  mfa: {
    term: 'MFA',
    expansion: 'Multi-Factor Authentication',
    definition: {
      fr: 'Authentification qui exige au moins deux preuves différentes, par exemple un mot de passe et un code à usage unique sur le téléphone.',
      en: 'Authentication that requires at least two different proofs, for example a password and a one-time code on a phone.',
    },
  },
  mtu: {
    term: 'MTU',
    expansion: 'Maximum Transmission Unit',
    definition: {
      fr: 'Taille maximale, en octets, d’un paquet pouvant traverser un lien sans être fragmenté. 1500 octets par défaut en Ethernet.',
      en: 'Maximum size, in bytes, of a packet that can cross a link without being fragmented. 1500 bytes by default on Ethernet.',
    },
  },
  nat: {
    term: 'NAT',
    expansion: 'Network Address Translation',
    definition: {
      fr: "Traduction d'adresses IP par un routeur ou un firewall. Elle permet notamment à des machines en adressage privé de sortir sur Internet derrière une adresse publique.",
      en: 'IP address translation performed by a router or firewall. It notably lets hosts with private addresses reach the Internet behind a public address.',
    },
  },
  ospf: {
    term: 'OSPF',
    expansion: 'Open Shortest Path First',
    definition: {
      fr: "Protocole de routage à état de liens : chaque routeur connaît la carte complète de sa zone et calcule le plus court chemin (Dijkstra).",
      en: "Link-state routing protocol: each router knows the full map of its area and computes the shortest path (Dijkstra).",
    },
  },
  oob: {
    term: 'OOB',
    expansion: 'Out-of-band',
    definition: {
      fr: 'Accès hors bande : un chemin vers les équipements indépendant du réseau de production (port console, lien 4G), qui fonctionne même quand ce réseau est en panne.',
      en: 'Out-of-band access: a path to the devices that does not depend on the production network (console port, 4G link), and still works when that network is down.',
    },
  },
  oui: {
    term: 'OUI',
    expansion: 'Organizationally Unique Identifier',
    definition: {
      fr: "Les 3 premiers octets d'une adresse MAC, attribués par l'IEEE à chaque constructeur (par exemple 00:1c:73 pour Arista).",
      en: "The first 3 bytes of a MAC address, assigned by the IEEE to each vendor (for example 00:1c:73 for Arista).",
    },
  },
  owasp: {
    term: 'OWASP',
    expansion: 'Open Worldwide Application Security Project',
    definition: {
      fr: "Fondation qui publie des références libres sur la sécurité des applications web, dont le Top 10 des risques et les règles ModSecurity CRS.",
      en: "Foundation publishing free web application security references, including the Top 10 risks and the ModSecurity CRS rules.",
    },
  },
  pac: {
    term: 'PAC',
    expansion: 'Proxy Auto-Configuration',
    definition: {
      fr: "Fichier JavaScript que le navigateur télécharge pour savoir, pour chaque URL, s'il doit passer par un proxy (et lequel) ou aller en direct.",
      en: "JavaScript file the browser downloads to decide, for each URL, whether to go through a proxy (and which one) or connect directly.",
    },
  },
  pdu: {
    term: 'PDU',
    expansion: 'Protocol Data Unit',
    definition: {
      fr: "Le nom de l'unité de données à chaque couche : bit (couche 1), trame (2), paquet (3), segment ou datagramme (4).",
      en: "The name of the data unit at each layer: bit (layer 1), frame (2), packet (3), segment or datagram (4).",
    },
  },
  pki: {
    term: 'PKI',
    expansion: 'Public Key Infrastructure',
    definition: {
      fr: "Infrastructure à clés publiques : les autorités de certification, les règles et les outils qui émettent, renouvellent et révoquent les certificats d'une organisation.",
      en: "Public key infrastructure: the certificate authorities, rules and tools that issue, renew and revoke an organization's certificates.",
    },
  },
  proxy: {
    term: 'Proxy',
    definition: {
      fr: "Intermédiaire qui reçoit une connexion à la place du destinataire et en ouvre une seconde vers lui. Il voit, filtre et journalise ce qui passe.",
      en: "Intermediary that receives a connection in place of the destination and opens a second one to it. It sees, filters and logs what goes through.",
    },
  },
  rib: {
    term: 'RIB',
    expansion: 'Routing Information Base',
    definition: {
      fr: "Table de routage du plan de contrôle : toutes les routes connues, d'où le routeur extrait la meilleure pour chaque destination.",
      en: "Control plane routing table: every known route, from which the router picks the best one for each destination.",
    },
  },
  rpki: {
    term: 'RPKI',
    expansion: 'Resource Public Key Infrastructure',
    definition: {
      fr: "Infrastructure qui permet de vérifier cryptographiquement qu'un AS a le droit d'annoncer un préfixe (via des ROA).",
      en: "Infrastructure that cryptographically verifies that an AS is allowed to announce a prefix (through ROAs).",
    },
  },
  snat: {
    term: 'SNAT',
    expansion: 'Source NAT',
    definition: {
      fr: "Traduction de l'adresse source : l'équipement remplace l'adresse du client par la sienne, pour que la réponse du serveur revienne forcément par lui.",
      en: "Source address translation: the device replaces the client address with its own, so the server's reply is sure to come back through it.",
    },
  },
  sni: {
    term: 'SNI',
    expansion: 'Server Name Indication',
    definition: {
      fr: "Extension TLS : le client indique en clair, dès le premier message, le nom du site qu'il veut joindre. C'est ce qui permet plusieurs sites HTTPS sur une même adresse IP.",
      en: "TLS extension: the client states in clear text, in its very first message, the name of the site it wants. It allows several HTTPS sites on the same IP address.",
    },
  },
  sot: {
    term: 'SoT',
    expansion: 'Source of Truth',
    definition: {
      fr: "La source de vérité : la base de données qui décrit l'état voulu du réseau (équipements, adresses, VLAN…), d'où l'on génère les configurations. NetBox est la plus connue.",
      en: "The source of truth: the database describing the intended state of the network (devices, addresses, VLANs…), from which configurations are generated. NetBox is the best known.",
    },
  },
  sse: {
    term: 'SSE',
    expansion: 'Security Service Edge',
    definition: {
      fr: "Services de sécurité livrés depuis le cloud : proxy web (SWG), accès aux applications privées (ZTNA) et contrôle des applications SaaS (CASB).",
      en: "Security services delivered from the cloud: web proxy (SWG), private application access (ZTNA) and SaaS application control (CASB).",
    },
  },
  stp: {
    term: 'STP',
    expansion: 'Spanning Tree Protocol',
    definition: {
      fr: "Protocole de couche 2 (IEEE 802.1D) qui bloque certains liens redondants entre switches pour éviter les boucles, et les réactive en cas de panne.",
      en: "Layer 2 protocol (IEEE 802.1D) that blocks some redundant links between switches to prevent loops, and re-enables them on failure.",
    },
  },
  svi: {
    term: 'SVI',
    expansion: 'Switched Virtual Interface',
    definition: {
      fr: "Interface virtuelle d'un switch associée à un VLAN (interface Vlan10). Elle porte une adresse IP et sert de passerelle aux machines du VLAN.",
      en: "Virtual switch interface bound to a VLAN (interface Vlan10). It holds an IP address and acts as the gateway for the VLAN's hosts.",
    },
  },
  swg: {
    term: 'SWG',
    expansion: 'Secure Web Gateway',
    definition: {
      fr: "Proxy web de sécurité : filtrage d'URL par catégorie, analyse antivirus, inspection TLS et journalisation de la navigation, sur site ou dans le cloud.",
      en: "Security web proxy: URL filtering by category, antivirus scanning, TLS inspection and browsing logs, on premises or in the cloud.",
    },
  },
  tacacs: {
    term: 'TACACS+',
    expansion: 'Terminal Access Controller Access-Control System Plus',
    definition: {
      fr: "Protocole AAA qui centralise l'authentification des administrateurs réseau sur un serveur, avec autorisation commande par commande et journal de chaque commande tapée.",
      en: "AAA protocol that centralizes network administrators' authentication on a server, with per-command authorization and a log of every command typed.",
    },
  },
  tcp: {
    term: 'TCP',
    expansion: 'Transmission Control Protocol',
    definition: {
      fr: "Protocole de transport fiable de la couche 4 : connexion établie au préalable, accusés de réception et retransmission des données perdues.",
      en: "Reliable layer 4 transport protocol: connection set up beforehand, acknowledgements and retransmission of lost data.",
    },
  },
  tls: {
    term: 'TLS',
    expansion: 'Transport Layer Security',
    definition: {
      fr: "Protocole qui chiffre une connexion TCP et authentifie le serveur par un certificat. Il protège HTTPS, mais aussi LDAPS, SMTP ou les API.",
      en: "Protocol that encrypts a TCP connection and authenticates the server with a certificate. It protects HTTPS, but also LDAPS, SMTP or APIs.",
    },
  },
  ttl: {
    term: 'TTL',
    expansion: 'Time To Live',
    definition: {
      fr: "Compteur de l'en-tête IP, décrémenté de 1 par chaque routeur. À 0, le paquet est détruit : une boucle de routage ne peut donc pas durer indéfiniment.",
      en: "Counter in the IP header, decremented by 1 by each router. At 0 the packet is dropped, so a routing loop cannot last forever.",
    },
  },
  udp: {
    term: 'UDP',
    expansion: 'User Datagram Protocol',
    definition: {
      fr: "Protocole de transport léger de la couche 4 : pas de connexion ni de retransmission. Utilisé par le DNS, la voix sur IP ou VXLAN.",
      en: "Lightweight layer 4 transport protocol: no connection and no retransmission. Used by DNS, voice over IP or VXLAN.",
    },
  },
  vip: {
    term: 'VIP',
    expansion: 'Virtual IP',
    definition: {
      fr: "Adresse IP virtuelle portée par un load balancer (ou une paire en haute disponibilité) : les clients s'y connectent, sans connaître les serveurs derrière.",
      en: "Virtual IP address held by a load balancer (or a high-availability pair): clients connect to it without knowing the servers behind.",
    },
  },
  vlan: {
    term: 'VLAN',
    expansion: 'Virtual LAN',
    definition: {
      fr: 'Réseau local virtuel : découpe un switch en plusieurs domaines de broadcast isolés, identifiés par un numéro de 1 à 4094.',
      en: 'Virtual local network: splits a switch into several isolated broadcast domains, identified by a number from 1 to 4094.',
    },
  },
  vrrp: {
    term: 'VRRP',
    expansion: 'Virtual Router Redundancy Protocol',
    definition: {
      fr: "Protocole de passerelle redondante : plusieurs routeurs partagent une même adresse IP de passerelle, et l'un reprend si l'autre tombe.",
      en: "Redundant gateway protocol: several routers share the same gateway IP address, and one takes over if the other fails.",
    },
  },
  vrf: {
    term: 'VRF',
    expansion: 'Virtual Routing and Forwarding',
    definition: {
      fr: 'Table de routage indépendante sur un même équipement : les interfaces d’une VRF ne voient que les routes de cette VRF, comme un routeur virtuel séparé.',
      en: 'Separate routing table on the same device: interfaces in a VRF only see that VRF’s routes, like a separate virtual router.',
    },
  },
  vxlan: {
    term: 'VXLAN',
    expansion: 'Virtual Extensible LAN',
    definition: {
      fr: "Encapsulation de trames Ethernet dans de l'UDP, pour transporter des réseaux de niveau 2 au-dessus d'un réseau IP. Jusqu'à 16 millions de segments (VNI).",
      en: 'Encapsulation of Ethernet frames in UDP, to carry layer 2 networks over an IP network. Up to 16 million segments (VNIs).',
    },
  },
  waf: {
    term: 'WAF',
    expansion: 'Web Application Firewall',
    definition: {
      fr: "Pare-feu applicatif web : il analyse le contenu des requêtes HTTP (URL, paramètres, en-têtes, corps) pour bloquer les attaques contre les applications.",
      en: "Web application firewall: it inspects HTTP request content (URL, parameters, headers, body) to block attacks against applications.",
    },
  },
  wpad: {
    term: 'WPAD',
    expansion: 'Web Proxy Auto-Discovery',
    definition: {
      fr: "Mécanisme par lequel un poste trouve tout seul l'adresse du fichier PAC, par DHCP (option 252) ou par le DNS (nom wpad).",
      en: "Mechanism letting a machine find the PAC file address on its own, through DHCP (option 252) or DNS (the wpad name).",
    },
  },
  yaml: {
    term: 'YAML',
    expansion: "YAML Ain't Markup Language",
    definition: {
      fr: "Format de fichier texte lisible, à base d'indentation, utilisé pour les inventaires, les variables et les playbooks Ansible.",
      en: "Human-readable, indentation-based text file format used for inventories, variables and Ansible playbooks.",
    },
  },
  ztp: {
    term: 'ZTP',
    expansion: 'Zero Touch Provisioning',
    definition: {
      fr: 'Mise en service automatique : au premier démarrage, l’équipement récupère son adresse en DHCP puis télécharge sa configuration, sans intervention sur place.',
      en: 'Automatic provisioning: on first boot, the device gets an address over DHCP then downloads its configuration, with no one on site.',
    },
  },
} satisfies Record<string, GlossaryEntry>;

export type TermId = keyof typeof glossary;
