// Outils open source de la communauté, recommandés sur la page Outils (liens externes).
// Toujours créditer l'auteur et indiquer la licence, telles qu'elles figurent dans le dépôt du projet.
import type { Lang } from '@/i18n/ui';

export interface CommunityTool {
  name: string;
  url: string;                                   // dépôt du projet
  docs?: string;                                 // documentation, si elle est séparée
  authors: { name: string; url: string; role?: Record<Lang, string> }[];
  license: string;
  description: Record<Lang, string>;
  tags: string[];
  tutorial?: Record<Lang, string>;               // tutoriel du site qui montre l'outil
}

export const communityTools: CommunityTool[] = [
  {
    name: 'eos-downloader',
    url: 'https://github.com/titom73/eos-downloader',
    docs: 'https://titom73.github.io/eos-downloader/',
    authors: [
      { name: 'TiTom73 (@titom73)', url: 'https://github.com/titom73' },
      {
        name: 'Mark Rayson (@Sparky-python)',
        url: 'https://github.com/Sparky-python',
        role: { fr: "idée d'origine", en: 'original idea' },
      },
    ],
    license: 'Apache 2.0',
    description: {
      fr: "Télécharge les images Arista (EOS, cEOS, CloudVision) en ligne de commande, les importe directement dans Docker, et récupère d'un coup toutes les versions cEOS d'une topologie ContainerLab.",
      en: 'Downloads Arista images (EOS, cEOS, CloudVision) from the command line, imports them straight into Docker, and fetches every cEOS version used by a ContainerLab topology in one go.',
    },
    tags: ['arista', 'ceos', 'containerlab', 'python'],
    tutorial: { fr: '/tutoriels/containerlab-setup', en: '/en/tutorials/containerlab-setup' },
  },
  {
    name: 'Netbox',
    url: 'https://github.com/netbox-community/netbox',
    docs: 'https://netboxlabs.com/docs/',
    authors: [
      { name: 'Jeremy Stretch (@jeremystretch)', url: 'https://github.com/jeremystretch' },
    ],
    license: 'Apache 2.0',
    description: {
      fr: "Jeremy Stretch est un ingénieur réseau américain et le créateur de NetBox, l'outil open-source de référence pour la gestion d'infrastructures réseau. Il a développé le projet en 2015 chez DigitalOcean avant de cofonder NetBox Labs en 2023 pour en piloter le développement.",
      en: 'Jeremy Stretch is an American network engineer and the creator of NetBox, the leading open-source network infrastructure management tool. He developed it in 2015 at DigitalOcean and later co-founded NetBox Labs in 2023 to drive its development.',
    },
    tags: ['netbox', 'python'],
    tutorial: { fr: '/formations/automation/netbox', en: ''},
  },
  {
    name: 'Containerlab',
    url: 'https://github.com',
    docs: 'https://containerlab.dev',
    authors: [
      { name: 'Roman Dodin (@hellt)', url: 'https://github.com/hellt' },
    ],
    license: 'BSD-3-Clause',
    description: {
      fr: "Roman Dodin est un ingénieur réseau et le principal mainteneur de Containerlab, l'outil en ligne de commande de référence pour orchestrer des laboratoires réseau basés sur des conteneurs. Développé initialement au sein de l'équipe SR Linux de Nokia, le projet permet de déployer des topologies complexes sous forme de code.",
      en: 'Roman Dodin is a network engineer and the lead maintainer of Containerlab, the premier CLI tool for orchestrating container-based networking labs. Originally developed within Nokia\'s SR Linux team, the project enables engineers to deploy complex topologies as code.',
    },
    tags: ['containerlab', 'go', 'docker', 'networking'],
    tutorial: { fr: '/formations/automation/containerlab', en: '/en/tutorials/containerlab-setup' },
  },
];
