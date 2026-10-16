# Next Hop

> Votre prochain saut vers le réseau · Your next hop into networking

Blog pédagogique réseau et sécurité, bilingue FR/EN, destiné aux étudiants et aux personnes en reconversion. Tutoriels écrits (pas de vidéo), formations en chapitres, labs ContainerLab téléchargeables et outils interactifs.

Auteur : Antoine Lecarpentier, IT Network Specialist.

---

## Stack

| Besoin | Choix |
|---|---|
| Framework | Astro (site 100 % statique) + MDX |
| Style | Tailwind CSS v4 (via `@tailwindcss/vite`) + `@tailwindcss/typography` |
| Polices | `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` |
| Blocs de code | `astro-expressive-code` (déclaré **avant** `mdx()` dans la config) |
| Recherche | Pagefind (index généré au build, UI pas encore intégrée) |
| Labs | Fichiers ContainerLab dans `public/labs/`, parsés avec `yaml` |
| Hébergement | Cloudflare Workers (static assets), déploiement auto à chaque push sur `main` |

Mode sombre : suit le réglage du système (`prefers-color-scheme`), pas encore de bouton.

---

## Commandes

```bash
npm run dev       # http://localhost:4321
npm run build     # astro build && pagefind --site dist
npm run preview   # sert dist/ en local
```

Toujours lancer `npm run build` avant de pousser : les erreurs de schéma y sont plus lisibles qu'en dev.

---

## Arborescence

```
src/
├── content.config.ts              # collections "tutorials" et "courses" (schéma Zod)
├── content/
│   ├── tutorials/{fr,en}/<slug>.mdx
│   └── courses/{fr,en}/<course>/
│       ├── index.mdx              # présentation de la formation (order: 0)
│       └── <chapter>.mdx          # chapitres (order: 1, 2, 3…)
├── components/
│   ├── HomePage.astro             # accueil (FR + EN)
│   ├── TutorialsPage.astro        # liste des tutoriels + filtre par niveau
│   ├── TutorialCard.astro
│   ├── CoursesPage.astro          # liste des formations
│   ├── CoursePage.astro           # programme d'une formation
│   ├── ChapterPage.astro          # chapitre + fil d'Ariane + précédent/suivant
│   ├── WhoamiPage.astro
│   ├── SubnetCalculator.astro     # calculateur IPv4 (script client)
│   ├── Lab.astro                  # encart lab : fichiers, curl, topologie, schéma
│   ├── ClabDiagram.astro          # schéma SVG généré depuis topology.clab.yml
│   └── diagrams/OsiModel.astro
├── layouts/
│   ├── BaseLayout.astro           # header, sélecteur FR/EN, footer, hreflang
│   └── ArticleLayout.astro        # article + TOC, slots "before" et "after"
├── i18n/ui.ts                     # languages, routes, dictionnaire ui, t(), formatDate()
├── lib/
│   ├── content.ts                 # tutoriels : getTutorials, getTutorialPaths, slugOf, tutorialUrl
│   ├── courses.ts                 # formations : getCourses, getCoursePaths, getChapterPaths, getPublished
│   └── levels.ts                  # couleurs des badges de niveau
├── data/
│   ├── profile.ts                 # données de la page whoami
│   └── roadmap.ts                 # parcours de l'accueil (formations + chapitres prévus)
├── styles/global.css
└── pages/
    ├── index.astro, 404.astro, whoami.astro
    ├── tutoriels/{index.astro, [...slug].astro}
    ├── formations/{index.astro, [course]/index.astro, [course]/[chapter].astro}
    └── en/
        ├── index.astro, whoami.astro
        ├── tutorials/{index.astro, [...slug].astro}
        └── courses/{index.astro, [course]/index.astro, [course]/[chapter].astro}
public/labs/<lab>/topology.clab.yml + configs/*.cfg
```

---

## Conventions

- **Code en anglais**, contenu dans la langue de l'article. Les URLs de pages sont traduites (`/tutoriels` / `/en/tutorials`), les slugs de contenu sont en anglais et **identiques en FR et EN**.
- **Une traduction = même nom de fichier** dans `fr/` et `en/`. Le sélecteur de langue pointe vers la traduction si elle existe, sinon vers l'accueil de l'autre langue.
- **Pattern de page** : un composant bilingue `XxxPage.astro` qui reçoit `lang`, et des fichiers de route minimes dans `src/pages/` et `src/pages/en/`.
- **Textes d'interface** dans `src/i18n/ui.ts` (TypeScript signale une clé manquante dans une langue). **URLs** dans `routes` du même fichier.
- **Frontmatter obligatoire** : `title`, `description`, `pubDate`, `level` (`beginner` | `intermediate` | `advanced`). Les formations ajoutent `order`.
- **Composants dans le MDX** : mettre la classe `not-prose` sur le conteneur racine.
- **Classes Tailwind écrites en entier** (jamais `bg-${color}-50`).
- **Confidentialité** : aucun nom de client (employeurs cités : SQUAD, Devoteam, Malherbe). Dans les exemples : AS privés `65000-65535`, plages de documentation `192.0.2.0/24`, `198.51.100.0/24`.
- **Alias** `@/` → `src/` (défini dans `tsconfig.json`) : `import Lab from '@/components/Lab.astro'`, quel que soit l'emplacement du fichier. Pas de `../`.

---

## Pièges déjà rencontrés

- **Collection vide ou 404 sur un article** : remonter au premier message d'erreur du terminal. Le plus souvent un champ obligatoire manquant (`level`) ou un fichier mal placé.
- **Fichiers de route disparus** : vérifier que `[...slug].astro`, `[course]/index.astro` et `[course]/[chapter].astro` existent bien (noms avec crochets, à créer entre guillemets simples).
- **Nouveau dossier de pages ou modif de `content.config.ts`** : redémarrer `npm run dev`.
- **Le champ `site`** de `astro.config.mjs` sert au sitemap, aux `hreflang` et aux URLs `curl` des labs : il doit correspondre au domaine de production.

---

## Prompt pour la prochaine session

> À copier-coller au début de la prochaine conversation, avec ce README.

```text
Je travaille sur Next Hop, mon blog réseau et sécurité bilingue FR/EN en Astro,
déployé sur Cloudflare Workers. Le README ci-joint décrit la stack, l'arborescence,
les conventions et les pièges déjà rencontrés : respecte-les.

Tâche : créer une page "Outils" (comme whoami, tutoriels, formations) et y déplacer
le calculateur de sous-réseau, qui ne doit plus être intégré dans les formations.

Attendus :
1. Routes : /outils en FR et /en/tools en EN. Ajouter `tools` dans `routes`
   (src/i18n/ui.ts) et les clés de traduction nécessaires (titre, intro, etc.).
2. Header : ajouter le lien "Outils" / "Tools" dans BaseLayout.astro, en gardant
   la nav lisible sur mobile.
3. Page : composant bilingue src/components/ToolsPage.astro + deux fichiers de route
   minimes (src/pages/outils/index.astro et src/pages/en/tools/index.astro).
   La page doit pouvoir accueillir d'autres outils plus tard (prévoir une structure
   de liste ou de cartes, par exemple dans src/data/tools.ts).
4. Le calculateur (src/components/SubnetCalculator.astro, inchangé) est affiché sur
   cette page. Éventuellement une page dédiée par outil (/outils/subnet) si c'est
   plus propre pour le SEO et le partage de lien : propose-moi la meilleure option.
5. Retirer <SubnetCalculator /> du chapitre
   src/content/courses/fr/fundamentals/ipv4-subnetting.mdx et le remplacer par un
   lien vers l'outil.
6. Me donner les fichiers complets (pas de diff partiel), les commandes pour créer
   les fichiers, et la checklist de test (FR, EN, sélecteur de langue, mobile).

Ensuite, si on a le temps, backlog par priorité :
- UI de recherche Pagefind dans le header
- Flux RSS (FR et EN)
- Composants <Callout> et <CliOutput>
- Bouton clair/sombre (penser à Expressive Code)
- Métadonnées Open Graph
```

---

## Backlog

- [ ] Page Outils + déplacement du calculateur (voir prompt ci-dessus)
- [ ] UI de recherche Pagefind
- [ ] Flux RSS FR/EN
- [ ] Composants `<Callout>` et `<CliOutput>`
- [ ] Bouton clair/sombre
- [ ] Open Graph / partage LinkedIn
- [ ] Contenu : chapitres des fondamentaux (ethernet, vlan, stp, static-routing)
- [ ] Remplacer les sorties CLI estimées par les vraies sorties du lab `evpn-basic`