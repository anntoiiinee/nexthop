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
];
