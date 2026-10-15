export const languages = { fr: 'FR', en: 'EN' } as const;
export type Lang = keyof typeof languages;

export const routes = {
  home: { fr: '/', en: '/en/' },
  tutorials: { fr: '/tutoriels', en: '/en/tutorials' },
  courses: { fr: '/formations', en: '/en/courses' },
  whoami: { fr: '/whoami', en: '/en/whoami'},
} as const;

export const ui = {
  fr: {
    'site.description': 'Tutoriels réseau et sécurité pour étudiants et personnes en reconversion.',
    'site.tagline': 'Votre prochain saut vers le réseau',
    'nav.tutorials': 'Tutoriels',
    'nav.courses': 'Formations',
    'level.beginner': 'Débutant',
    'level.intermediate': 'Intermédiaire',
    'level.advanced': 'Avancé',
    'article.published': 'Publié le',
    'article.updated': 'mis à jour le',
    'article.toc': 'Sur cette page',
    'lang.switch': 'Read in English',
    'tutorials.title': 'Tutoriels',
    'tutorials.intro': 'Des articles autonomes pour comprendre une notion ou résoudre un problème précis.',
    'tutorials.all': 'Tous',
    'tutorials.empty': 'Les premiers tutoriels arrivent très bientôt.',
    'courses.title': 'Formations',
    'courses.intro': 'Des parcours complets, chapitre par chapitre, pour monter en compétence sur un sujet.',
    'courses.empty': "Les premières formations sont en cours d'écriture.",
    'courses.chapters': 'chapitres',
    'courses.program': 'Programme',
    'courses.start': 'Commencer la formation',
    'courses.chapter': 'Chapitre',
    'courses.prev': 'Précédent',
    'courses.next': 'Suivant',
    'courses.back': 'Retour au programme',
    'courses.soon': 'bientôt',
  },
  en: {
    'site.description': 'Networking and security tutorials for students and career changers.',
    'site.tagline': 'Your next hop into networking',
    'nav.tutorials': 'Tutorials',
    'nav.courses': 'Courses',
    'level.beginner': 'Beginner',
    'level.intermediate': 'Intermediate',
    'level.advanced': 'Advanced',
    'article.published': 'Published on',
    'article.updated': 'updated on',
    'article.toc': 'On this page',
    'lang.switch': 'Lire en français',
    'tutorials.title': 'Tutorials',
    'tutorials.intro': 'Standalone articles to understand a concept or solve a specific problem.',
    'tutorials.all': 'All',
    'tutorials.empty': 'The first tutorials are coming soon.',
    'courses.title': 'Courses',
    'courses.intro': 'Complete learning paths, chapter by chapter, to level up on a topic.',
    'courses.empty': 'The first courses are being written.',
    'courses.chapters': 'chapters',
    'courses.program': 'Syllabus',
    'courses.start': 'Start the course',
    'courses.chapter': 'Chapter',
    'courses.prev': 'Previous',
    'courses.next': 'Next',
    'courses.back': 'Back to syllabus',
    'courses.soon': 'soon',
  },
} as const;

export type UiKey = keyof (typeof ui)['fr'];
export const t = (lang: Lang, key: UiKey) => ui[lang][key];

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });