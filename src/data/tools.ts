import { routes, type Lang } from '@/i18n/ui';
import { chapterUrl } from '@/lib/courses';
import SubnetCalculator from '@/components/SubnetCalculator.astro';
import SubnetQuiz from '@/components/SubnetQuiz.astro';
import VlsmPlanner from '@/components/VlsmPlanner.astro';
import CertDecoder from '@/components/CertDecoder.astro';
import PortsReference from '@/components/PortsReference.astro';

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
];

export const toolUrl = (lang: Lang, slug: string) => `${routes.tools[lang]}/${slug}`;
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

export const getToolPaths = () =>
  tools.map((tool) => ({ params: { tool: tool.slug } }));
