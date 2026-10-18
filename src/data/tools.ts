import { routes, type Lang } from '@/i18n/ui';
import { chapterUrl } from '@/lib/courses';
import SubnetCalculator from '@/components/SubnetCalculator.astro';
import SubnetQuiz from '@/components/SubnetQuiz.astro';
import VlsmPlanner from '@/components/VlsmPlanner.astro';
import CertDecoder from '@/components/CertDecoder.astro';
import PortsReference from '@/components/PortsReference.astro';
import Ipv6Calculator from '@/components/Ipv6Calculator.astro';
import MtuCalculator from '@/components/MtuCalculator.astro';
import ClabVisualizer from '@/components/ClabVisualizer.astro';
import BaseConverter from '@/components/BaseConverter.astro';
import { tutorialUrl } from '@/lib/content';

export interface Tool {
  slug: string;                                  // segment d'URL, identique en FR et EN
  badge: string;                                 // petit visuel monospace de la carte
  title: Record<Lang, string>;
  description: Record<Lang, string>;             // carte + meta description
  howto: Record<Lang, string[]>;                 // mode d'emploi sous l'outil
  tags: string[];
  learnMore?: Partial<Record<Lang, string>>;     // chapitre ou tutoriel associé
  component: (props: { lang: Lang }) => unknown; // composant Astro de l'outil
}

export const tools: Tool[] = [
  {
    slug: 'subnet-calculator',
    badge: '/26',
    title: {
      fr: 'Calculateur de sous-réseau IPv4',
      en: 'IPv4 subnet calculator',
    },
    description: {
      fr: 'Adresse réseau, broadcast, masque, wildcard, plage d’hôtes et vue binaire à partir d’une adresse en notation CIDR ou avec masque.',
      en: 'Network address, broadcast, mask, wildcard, host range and binary view from an address in CIDR notation or with a mask.',
    },
    howto: {
      fr: [
        'Saisissez une adresse suivie de son préfixe (192.168.10.37/26) ou de son masque (10.0.0.1 255.255.255.0).',
        'La vue binaire montre la frontière entre bits réseau et bits hôte : c’est elle qui détermine l’adresse réseau et le broadcast.',
        'Essayez 10.0.1.0/31, le préfixe utilisé pour les liens point à point entre spines et leafs (RFC 3021).',
      ],
      en: [
        'Enter an address followed by its prefix (192.168.10.37/26) or its mask (10.0.0.1 255.255.255.0).',
        'The binary view shows the boundary between network bits and host bits: it determines the network and broadcast addresses.',
        'Try 10.0.1.0/31, the prefix used for point-to-point links between spines and leaves (RFC 3021).',
      ],
    },
    tags: ['ipv4', 'subnetting'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'ipv4-subnetting'),
    },
    component: SubnetCalculator,
  },
  {
    slug: 'vlsm-planner',
    badge: 'VLSM',
    title: {
      fr: 'Découpeur de sous-réseaux VLSM',
      en: 'VLSM subnet planner',
    },
    description: {
      fr: "Découpez un bloc d'adresses en sous-réseaux de tailles différentes selon vos besoins en hôtes, et obtenez un plan d'adressage prêt à l'emploi.",
      en: 'Split an address block into subnets of different sizes based on your host requirements, and get a ready-to-use addressing plan.',
    },
    howto: {
      fr: [
        'Indiquez le bloc à découper (192.168.10.0/24), puis un besoin par ligne : un nom et le nombre de machines à adresser.',
        "Les sous-réseaux sont alloués du plus grand au plus petit : c'est ce qui garantit que chaque réseau démarre sur une frontière valide, sans chevauchement.",
        'Pensez à la croissance : prévoir 60 hôtes quand on en a 50 aujourd’hui évite de tout renuméroter dans un an.',
        "Le lien « Copier le lien du plan » enregistre tout le plan dans l'URL : pratique pour l'envoyer à un formateur ou un collègue.",
      ],
      en: [
        'Enter the block to split (192.168.10.0/24), then one requirement per line: a name and the number of hosts to address.',
        'Subnets are allocated from largest to smallest: this guarantees that each network starts on a valid boundary, with no overlap.',
        'Plan for growth: sizing for 60 hosts when you have 50 today saves you from renumbering next year.',
        'The "Copy link to this plan" button stores the whole plan in the URL: handy to send it to a teacher or a colleague.',
      ],
    },
    tags: ['ipv4', 'subnetting', 'vlsm'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'ipv4-subnetting'),
    },
    component: VlsmPlanner,
  },
  {
    slug: 'subnetting-quiz',
    badge: '?/27',
    title: {
      fr: 'Quiz de subnetting',
      en: 'Subnetting quiz',
    },
    description: {
      fr: 'Des questions générées à l’infini sur les adresses réseau, broadcast, masques et nombres d’hôtes, avec le raisonnement détaillé à chaque réponse.',
      en: 'Endless generated questions on network and broadcast addresses, masks and host counts, with the step-by-step reasoning for every answer.',
    },
    howto: {
      fr: [
        'Choisissez un niveau : Débutant reste sur le dernier octet (/24 à /30), Intermédiaire descend jusqu’au /16, Avancé jusqu’au /8 avec les wildcards.',
        'Calculez de tête ou sur papier, comme le jour de l’examen, puis validez avec Entrée.',
        "Après chaque réponse, la méthode du « nombre magique » (256 − l'octet du masque) et la vue binaire montrent comment trouver le résultat.",
        'Votre meilleure série est conservée dans ce navigateur.',
      ],
      en: [
        'Pick a level: Beginner stays in the last octet (/24 to /30), Intermediate goes down to /16, Advanced down to /8 with wildcards.',
        'Work it out in your head or on paper, like on exam day, then press Enter.',
        'After each answer, the "magic number" method (256 − the mask octet) and the binary view show how to get the result.',
        'Your best streak is kept in this browser.',
      ],
    },
    tags: ['ipv4', 'subnetting', 'quiz'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'ipv4-subnetting'),
    },
    component: SubnetQuiz,
  },
  {
    slug: 'cert-decoder',
    badge: 'X.509',
    title: {
      fr: 'Décodeur de certificats X.509 et CSR',
      en: 'X.509 certificate and CSR decoder',
    },
    description: {
      fr: 'Lisez un certificat, une chaîne ou une demande de certificat (CSR) : CN, SAN, dates, émetteur, taille de clé, usages et empreintes, sans que rien ne quitte votre navigateur.',
      en: 'Read a certificate, a chain or a certificate signing request (CSR): CN, SAN, dates, issuer, key size, usages and fingerprints, without anything leaving your browser.',
    },
    howto: {
      fr: [
        'Collez un certificat ou une CSR au format PEM (avec les lignes BEGIN et END), ou déposez un fichier .pem, .crt, .cer, .der ou .csr.',
        'Une chaîne complète est acceptée : chaque certificat est affiché, et l’outil indique quand l’un est émis par le suivant.',
        'Les alertes signalent ce qui pose problème en production : expiration proche, clé trop faible, signature SHA-1, absence de SAN, durée trop longue pour un certificat public.',
        'Rien n’est envoyé : le décodage et le calcul des empreintes se font dans votre navigateur. Ne collez tout de même jamais une clé privée dans un outil en ligne.',
        'Équivalent en ligne de commande : openssl x509 -in cert.pem -noout -text, ou openssl req -in demande.csr -noout -text.',
      ],
      en: [
        'Paste a certificate or a CSR in PEM format (with the BEGIN and END lines), or drop a .pem, .crt, .cer, .der or .csr file.',
        'A full chain is accepted: every certificate is shown, and the tool tells you when one is issued by the next.',
        'Warnings flag what causes trouble in production: upcoming expiry, weak key, SHA-1 signature, missing SAN, lifetime too long for a public certificate.',
        'Nothing is sent: decoding and fingerprint computation happen in your browser. Still, never paste a private key into an online tool.',
        'Command-line equivalent: openssl x509 -in cert.pem -noout -text, or openssl req -in request.csr -noout -text.',
      ],
    },
    tags: ['tls', 'pki', 'x509', 'security'],
    component: CertDecoder,
  },
  {
    slug: 'ports-protocols',
    badge: ':179',
    title: {
      fr: 'Référence ports et protocoles',
      en: 'Ports and protocols reference',
    },
    description: {
      fr: 'Le port ou le numéro de protocole de BGP, OSPF, VXLAN, IPsec, RADIUS, syslog et des autres protocoles réseau, avec une recherche par numéro ou par nom.',
      en: 'The port or protocol number of BGP, OSPF, VXLAN, IPsec, RADIUS, syslog and other network protocols, searchable by number or by name.',
    },
    howto: {
      fr: [
        'Cherchez par numéro (179, 4789), par transport et numéro (udp 53, 179/tcp) ou par nom (radius, ntp). Les EtherTypes se cherchent en hexadécimal (0x88cc).',
        'Certains protocoles n’ont pas de port : OSPF, ESP ou VRRP sont des protocoles IP à part entière (numéro dans l’en-tête IP), LLDP et LACP sont reconnus par leur EtherType, IS-IS et STP voyagent en LLC. Une règle « TCP/UDP » ne les laisse donc pas passer.',
        'Le badge « en clair » signale un protocole qui transporte identifiants ou données sans chiffrement. Le badge « par défaut, non IANA » signale un port choisi par un logiciel, qui peut changer d’une installation à l’autre.',
        'La recherche et la catégorie sont conservées dans l’adresse de la page : copiez-la pour partager un filtre.',
        'Le registre officiel est celui de l’IANA (Service Name and Transport Protocol Port Number Registry). En cas de doute sur un équipement, sa documentation fait foi.',
      ],
      en: [
        'Search by number (179, 4789), by transport and number (udp 53, 179/tcp) or by name (radius, ntp). EtherTypes are searched in hexadecimal (0x88cc).',
        'Some protocols have no port: OSPF, ESP or VRRP are IP protocols of their own (number in the IP header), LLDP and LACP are identified by their EtherType, IS-IS and STP travel in LLC frames. A "TCP/UDP" rule does not let them through.',
        'The "cleartext" badge flags a protocol carrying credentials or data without encryption. The "default, not IANA" badge flags a port picked by a piece of software, which may change from one setup to another.',
        'The search and category are kept in the page address: copy it to share a filter.',
        'The official registry is IANA’s (Service Name and Transport Protocol Port Number Registry). When in doubt about a device, its documentation prevails.',
      ],
    },
    tags: ['ports', 'protocols', 'firewall'],
    component: PortsReference,
  },
  {
    slug: 'ipv6-calculator',
    badge: '::/64',
    title: {
      fr: 'Calculateur IPv6',
      en: 'IPv6 calculator',
    },
    description: {
      fr: 'Forme compressée et complète, préfixe, première et dernière adresse, nombre de /64, type d’adresse, nom DNS inverse et identifiant EUI-64 à partir d’une adresse MAC.',
      en: 'Compressed and full forms, prefix, first and last address, number of /64s, address type, reverse DNS name and EUI-64 identifier from a MAC address.',
    },
    howto: {
      fr: [
        'Saisissez une adresse suivie de son préfixe (2001:db8:acad:10::37/64). Toutes les écritures sont acceptées : complète, compressée avec « :: », ou terminée par une IPv4 (::ffff:192.0.2.1).',
        'La forme compressée suit la RFC 5952 : zéros de tête retirés, et « :: » remplace la plus longue suite de groupes nuls. C’est l’écriture à utiliser dans la documentation et les configurations.',
        'Un sous-réseau IPv6 standard est un /64 : un site reçoit en général un /48 ou un /56, soit 65 536 ou 256 sous-réseaux /64.',
        'Ajoutez une adresse MAC pour voir l’adresse EUI-64 : le bit U/L du premier octet est inversé et ff:fe est inséré au milieu. Les systèmes récents utilisent plutôt des identifiants aléatoires (RFC 7217, RFC 8981) pour ne pas exposer la MAC.',
        'Les exemples utilisent 2001:db8::/32, le préfixe réservé à la documentation (RFC 3849).',
      ],
      en: [
        'Enter an address followed by its prefix (2001:db8:acad:10::37/64). Every notation is accepted: full, compressed with "::", or ending with an IPv4 address (::ffff:192.0.2.1).',
        'The compressed form follows RFC 5952: leading zeros removed, and "::" replaces the longest run of zero groups. It is the notation to use in documentation and configurations.',
        'A standard IPv6 subnet is a /64: a site usually receives a /48 or a /56, that is 65,536 or 256 /64 subnets.',
        'Add a MAC address to see the EUI-64 address: the U/L bit of the first byte is flipped and ff:fe is inserted in the middle. Recent systems rather use random identifiers (RFC 7217, RFC 8981) so as not to expose the MAC.',
        'Examples use 2001:db8::/32, the prefix reserved for documentation (RFC 3849).',
      ],
    },
    tags: ['ipv6', 'subnetting'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'ipv6'),
      en: chapterUrl('en', 'fundamentals', 'ipv6'),
    },
    component: Ipv6Calculator,
  },
  {
    slug: 'mtu-calculator',
    badge: '1450',
    title: {
      fr: 'Calculateur MTU et overhead',
      en: 'MTU and overhead calculator',
    },
    description: {
      fr: 'Empilez VXLAN, GRE, IPsec, NAT-T, WireGuard, MPLS ou PPPoE et obtenez la MTU disponible, le MSS TCP et la MTU nécessaire sur le lien, bourrage compris.',
      en: 'Stack VXLAN, GRE, IPsec, NAT-T, WireGuard, MPLS or PPPoE and get the available MTU, the TCP MSS and the link MTU needed, padding included.',
    },
    howto: {
      fr: [
        'Indiquez la MTU du lien qui transporte le tout, puis ajoutez les encapsulations dans l’ordre : la dernière ajoutée est la plus extérieure. GRE puis IPsec donne donc du GRE dans IPsec.',
        'La « MTU disponible à l’intérieur » est la taille du plus grand paquet qui passe sans fragmentation. Le MSS en découle : c’est la valeur à configurer avec ip tcp adjust-mss (ou équivalent) sur l’interface du tunnel.',
        'IPsec et WireGuard bourrent les données pour les aligner sur la taille de bloc du chiffrement : leur surcoût varie de quelques octets selon la taille du paquet. Le calcul en tient compte.',
        'La « MTU de lien nécessaire » répond à la question inverse : quelle MTU configurer sur l’underlay pour que les machines gardent une MTU de 1500. Pour VXLAN, c’est 1550 au minimum, d’où les MTU de 9000 et plus dans les fabrics.',
        'Le symptôme d’une MTU trop petite est trompeur : le ping et les petites requêtes passent, les gros transferts se bloquent. Testez avec ping -M do -s 1472 (Linux) ou ping -f -l 1472 (Windows).',
      ],
      en: [
        'Enter the MTU of the link carrying everything, then add encapsulations in order: the last one added is the outermost. GRE then IPsec therefore gives GRE inside IPsec.',
        'The "MTU available inside" is the size of the largest packet that goes through without fragmentation. The MSS follows from it: it is the value to set with ip tcp adjust-mss (or equivalent) on the tunnel interface.',
        'IPsec and WireGuard pad data to align it on the cipher block size: their overhead varies by a few bytes depending on packet size. The calculation accounts for it.',
        'The "link MTU needed" answers the opposite question: which MTU to set on the underlay so that hosts keep a 1500 MTU. For VXLAN it is at least 1550, hence the 9000+ MTUs in fabrics.',
        'The symptom of an MTU that is too small is misleading: ping and small requests work, large transfers hang. Test with ping -M do -s 1472 (Linux) or ping -f -l 1472 (Windows).',
      ],
    },
    tags: ['mtu', 'vxlan', 'ipsec', 'tcp'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'tcp-udp'),
      en: chapterUrl('en', 'fundamentals', 'tcp-udp'),
    },
    component: MtuCalculator,
  },
  {
    slug: 'containerlab-visualizer',
    badge: '.clab',
    title: {
      fr: 'Visualiseur ContainerLab',
      en: 'ContainerLab visualizer',
    },
    description: {
      fr: 'Collez un fichier topology.clab.yml et obtenez le schéma de la topologie, avec les noms d’interfaces sur chaque lien, sans rien installer.',
      en: 'Paste a topology.clab.yml file and get the topology diagram, with interface names on every link, without installing anything.',
    },
    howto: {
      fr: [
        'Collez le contenu d’un fichier topology.clab.yml, ou partez d’un des labs du site avec la liste d’exemples. Le schéma se met à jour pendant la saisie.',
        'Les équipements sont rangés par niveau : spines en haut, leafs au milieu, machines Linux en bas, d’après leur nom et leur type. Pour forcer un niveau, ajoutez un label graph-level: 1, 2 ou 3 à l’équipement, comme dans ContainerLab.',
        'Un lien vers un équipement absent de topology.nodes est signalé et ignoré : c’est souvent une faute de frappe qui empêcherait aussi le déploiement.',
        'Les interfaces eth1, eth2… des équipements cEOS sont affichées Et1, Et2…, comme dans la CLI d’EOS.',
        'Rien n’est envoyé : l’analyse du YAML et le dessin se font dans votre navigateur.',
      ],
      en: [
        'Paste the content of a topology.clab.yml file, or start from one of the site’s labs with the example list. The diagram updates as you type.',
        'Nodes are arranged by level: spines at the top, leaves in the middle, Linux hosts at the bottom, based on their name and kind. To force a level, add a graph-level: 1, 2 or 3 label to the node, as in ContainerLab.',
        'A link to a node missing from topology.nodes is reported and ignored: it is often a typo that would also break the deployment.',
        'The eth1, eth2… interfaces of cEOS nodes are shown as Et1, Et2…, as in the EOS CLI.',
        'Nothing is sent: YAML parsing and drawing happen in your browser.',
      ],
    },
    tags: ['containerlab', 'lab', 'yaml'],
    learnMore: {
      fr: tutorialUrl('fr', 'containerlab-setup'),
      en: tutorialUrl('en', 'containerlab-setup'),
    },
    component: ClabVisualizer,
  },
  {
    slug: 'base-converter',
    badge: '0xC0',
    title: {
      fr: 'Convertisseur binaire, hexadécimal et décimal',
      en: 'Binary, hexadecimal and decimal converter',
    },
    description: {
      fr: 'Convertissez un nombre entre décimal, hexadécimal et binaire avec le poids de chaque bit, et décomposez une adresse IPv4 ou MAC octet par octet.',
      en: 'Convert a number between decimal, hexadecimal and binary with the weight of each bit, and break down an IPv4 or MAC address byte by byte.',
    },
    howto: {
      fr: [
        'Modifiez le champ décimal, hexadécimal ou binaire : les deux autres suivent. Les préfixes 0x et 0b sont acceptés mais pas obligatoires.',
        'La grille montre le poids de chaque bit (128, 64, 32… pour un octet) : additionner les poids des bits à 1 redonne la valeur décimale. C’est la méthode à connaître pour les masques : 255.255.255.192 se termine par 11000000, soit 128 + 64.',
        'Un chiffre hexadécimal correspond exactement à 4 bits : C0 = 1100 0000. C’est pourquoi les adresses MAC et IPv6 s’écrivent en hexadécimal.',
        'Dans la partie adresse, une MAC révèle deux bits utiles au dépannage : I/G (unicast ou groupe) et U/L (adresse du constructeur ou administrée localement, typique des machines virtuelles et des adresses aléatoires des téléphones).',
      ],
      en: [
        'Edit the decimal, hexadecimal or binary field: the other two follow. The 0x and 0b prefixes are accepted but not required.',
        'The grid shows the weight of each bit (128, 64, 32… for a byte): adding the weights of the bits set to 1 gives back the decimal value. It is the method to know for masks: 255.255.255.192 ends with 11000000, that is 128 + 64.',
        'One hexadecimal digit maps exactly to 4 bits: C0 = 1100 0000. That is why MAC and IPv6 addresses are written in hexadecimal.',
        'In the address part, a MAC reveals two bits useful for troubleshooting: I/G (unicast or group) and U/L (manufacturer address or locally administered, typical of virtual machines and of phones’ random addresses).',
      ],
    },
    tags: ['binary', 'hexadecimal', 'ipv4', 'mac'],
    learnMore: {
      fr: chapterUrl('fr', 'fundamentals', 'ipv4-subnetting'),
      en: chapterUrl('en', 'fundamentals', 'ipv4-subnetting'),
    },
    component: BaseConverter,
  },
];

export const toolUrl = (lang: Lang, slug: string) => `${routes.tools[lang]}/${slug}`;
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

export const getToolPaths = () =>
  tools.map((tool) => ({ params: { tool: tool.slug } }));
