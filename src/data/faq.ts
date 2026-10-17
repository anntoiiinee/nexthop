// FAQ de l'accueil. Réponses en texte brut (réutilisées dans les données structurées FAQPage pour Google).
import { routes, type Lang } from '@/i18n/ui';
import { coffeeUrl, issuesUrl } from '@/lib/support';

type T = { fr: string; en: string };

export interface FaqItem {
  question: T;
  answer: T;
  link?: { label: T; href: Record<Lang, string>; external?: boolean };
}

export const faq: FaqItem[] = [
  {
    question: { fr: 'Faut-il acheter du matériel pour suivre les tutoriels ?', en: 'Do I need to buy hardware to follow the tutorials?' },
    answer: {
      fr: "Non. Les labs utilisent ContainerLab, qui fait tourner des routeurs et des switches virtuels sur un simple PC sous Linux ou Windows avec WSL2. Les images de certains constructeurs, comme Arista cEOS, se téléchargent gratuitement après création d'un compte.",
      en: 'No. The labs use ContainerLab, which runs virtual routers and switches on a regular PC with Linux, or Windows with WSL2. Some vendor images, like Arista cEOS, can be downloaded for free after creating an account.',
    },
    link: {
      label: { fr: 'Monter son lab pas à pas', en: 'Build your lab step by step' },
      href: { fr: '/tutoriels/containerlab-setup', en: '/en/tutorials/containerlab-setup' },
    },
  },
  {
    question: { fr: "C'est gratuit ?", en: 'Is it free?' },
    answer: {
      fr: 'Oui. Tutoriels, formations, outils et labs sont en accès libre, sans inscription.'
        + (coffeeUrl ? ' Si un contenu vous a aidé, vous pouvez soutenir le blog en offrant un café.' : ''),
      en: 'Yes. Tutorials, courses, tools and labs are freely available, with no sign-up.'
        + (coffeeUrl ? ' If something helped you, you can support the blog by buying me a coffee.' : ''),
    },
    ...(coffeeUrl ? {
      link: { label: { fr: 'Offrir un café', en: 'Buy me a coffee' }, href: { fr: coffeeUrl, en: coffeeUrl }, external: true },
    } : {}),
  },
  {
    question: { fr: 'Je pars de zéro : par où commencer ?', en: "I'm starting from scratch: where do I begin?" },
    answer: {
      fr: "Commencez par la formation Fondamentaux : modèle OSI, Ethernet, VLAN, adressage IPv4. Chaque chapitre s'appuie sur le précédent, sans prérequis.",
      en: 'Start with the Fundamentals course: OSI model, Ethernet, VLANs, IPv4 addressing. Each chapter builds on the previous one, with no prerequisites.',
    },
    link: { label: { fr: 'Voir les formations', en: 'See the courses' }, href: routes.courses },
  },
  {
    question: { fr: 'Est-ce que ça prépare aux certifications (CCNA, examens) ?', en: 'Does it prepare for certifications (CCNA, exams)?' },
    answer: {
      fr: "Les fondamentaux couvrent une bonne partie des notions du CCNA et des examens de BTS SIO ou BUT R&T, et le quiz de subnetting permet de s'entraîner. Ce n'est pas un cours officiel : l'objectif est de comprendre, pas de réciter.",
      en: "The fundamentals cover a good share of CCNA topics, and the subnetting quiz lets you practice. It is not an official course: the goal is to understand, not to memorize.",
    },
  },
  {
    question: { fr: 'Les contenus existent-ils en anglais ?', en: 'Is the content available in French and English?' },
    answer: {
      fr: "Le site est bilingue. Les contenus sont écrits en français puis traduits progressivement : certains n'existent encore qu'en français.",
      en: 'The site is bilingual. Content is written in French first and translated progressively: some pages are still French-only.',
    },
  },
  {
    question: { fr: 'Puis-je proposer un sujet ou signaler une erreur ?', en: 'Can I suggest a topic or report a mistake?' },
    answer: {
      fr: "Avec plaisir : ouvrez une issue sur GitHub, ou utilisez le lien « Signaler une erreur » en bas de chaque article, qui pré-remplit la page concernée. Les retours des lecteurs orientent les prochains tutoriels.",
      en: 'Gladly: open an issue on GitHub, or use the "Report a mistake" link at the end of each article, which pre-fills the page in question. Reader feedback shapes the next tutorials.',
    },
    link: { label: { fr: 'Ouvrir une issue sur GitHub', en: 'Open an issue on GitHub' }, href: { fr: issuesUrl, en: issuesUrl }, external: true },
  },
];
