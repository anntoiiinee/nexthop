// « Par où commencer ? » : premières étapes conseillées pour chaque profil de l'accueil.
// Une étape qui pointe vers un contenu non publié dans la langue de la page est masquée
// automatiquement (ex. chapitres pas encore traduits en anglais).

type T = { fr: string; en: string };

export type StartStep =
  | { kind: 'course'; course: string; label: T }
  | { kind: 'chapter'; course: string; chapter: string; label: T }
  | { kind: 'tutorial'; slug: string; label: T }
  | { kind: 'tool'; slug: string; label: T };

export type AudienceKey = 'students' | 'careerChangers' | 'admins';

export const startHere: Record<AudienceKey, StartStep[]> = {
  students: [
    { kind: 'chapter', course: 'fundamentals', chapter: 'ipv4-subnetting', label: { fr: 'Réviser le subnetting', en: 'Review subnetting' } },
    { kind: 'tool', slug: 'subnetting-quiz', label: { fr: "S'entraîner avec le quiz", en: 'Practice with the quiz' } },
    { kind: 'tool', slug: 'vlsm-planner', label: { fr: "Faire un plan d'adressage VLSM", en: 'Build a VLSM addressing plan' } },
  ],
  careerChangers: [
    { kind: 'course', course: 'fundamentals', label: { fr: 'Suivre la formation Fondamentaux', en: 'Take the Fundamentals course' } },
    { kind: 'chapter', course: 'fundamentals', chapter: 'osi', label: { fr: 'Comprendre le modèle OSI', en: 'Understand the OSI model' } },
    { kind: 'tool', slug: 'subnet-calculator', label: { fr: 'Jouer avec le calculateur IPv4', en: 'Play with the IPv4 calculator' } },
  ],
  admins: [
    { kind: 'course', course: 'routing', label: { fr: 'La formation Routage dynamique', en: 'The Dynamic routing course' } },
    { kind: 'tutorial', slug: 'bgp-evpn-route-types', label: { fr: 'Les route types EVPN', en: 'EVPN route types' } },
    { kind: 'course', course: 'datacenter', label: { fr: 'La formation Data center', en: 'The Data center course' } },
    { kind: 'course', course: 'automation', label: { fr: "La formation Automatisation", en: 'The Automation course' } },
  ],
};
