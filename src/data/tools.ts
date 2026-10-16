import { routes, type Lang } from '@/i18n/ui';
import { chapterUrl } from '@/lib/courses';
import SubnetCalculator from '@/components/SubnetCalculator.astro';
import SubnetQuiz from '@/components/SubnetQuiz.astro';
import VlsmPlanner from '@/components/VlsmPlanner.astro';

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
];

export const toolUrl = (lang: Lang, slug: string) => `${routes.tools[lang]}/${slug}`;
export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);

export const getToolPaths = () =>
  tools.map((tool) => ({ params: { tool: tool.slug } }));
