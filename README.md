<p align="center">
  <img src="public/icon-512.png" alt="Next Hop" width="96" height="96" />
</p>

<h1 align="center">Next Hop</h1>

<p align="center">
  <strong>Votre prochain saut vers le réseau · Your next hop into networking</strong><br />
  <a href="https://nexthop.alcpt.network">nexthop.alcpt.network</a>
</p>

<p align="center">
  <img alt="Astro" src="https://img.shields.io/badge/Astro-7.4-BC52EE?logo=astro&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="MDX" src="https://img.shields.io/badge/MDX-8.1-1B1F24?logo=mdx&logoColor=white" />
  <img alt="Pagefind" src="https://img.shields.io/badge/Pagefind-1.5-0EA5E9" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-22.23-5FA04E?logo=nodedotjs&logoColor=white" />
  <img alt="Cloudflare Workers" src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" />
  <a href="https://buymeacoffee.com/anntoiiinee"><img alt="Buy Me a Coffee" src="https://img.shields.io/badge/Buy_me_a_coffee-FFDD00?logo=buymeacoffee&logoColor=black" /></a>
</p>

---

Blog pédagogique réseau et sécurité, bilingue FR/EN, destiné aux étudiants et aux personnes en reconversion : tutoriels écrits (pas de vidéo), formations en chapitres, labs ContainerLab téléchargeables et outils interactifs.

Auteur : Antoine Lecarpentier, IT Network Specialist.

## Fonctionnalités

- **Tutoriels et formations** en MDX, bilingues, avec filtres par niveau et par technologie (`/tutoriels?tech=arista`).
- **Outils interactifs**, 100 % côté navigateur : calculateur de sous-réseau, découpeur VLSM (plan partageable par URL, export CSV), quiz de subnetting.
- **Glossaire** : `<Term id="nat" />` souligne le terme en pointillés et affiche sa définition au survol.
- **Labs ContainerLab** : topologies dans `public/labs/`, schéma généré automatiquement, commande `curl` prête à copier.
- **Recherche** Pagefind (Ctrl/⌘+K), limitée à la langue de la page.
- **Flux RSS** FR (`/rss.xml`) et EN (`/en/rss.xml`) : tutoriels et chapitres de formation.
- **Thème clair/sombre** : suit le système par défaut, choix mémorisé, sans flash au chargement.
- **Accueil** : chiffres du site, « par où commencer » par profil, carrousel des technologies, terme du jour, FAQ.
- **Référencement** : sitemap, `robots.txt`, canonical, hreflang, Open Graph, données structurées schema.org.
- **Lecteurs** : bouton Buy Me a Coffee, lien « Signaler une erreur » qui pré-remplit une issue GitHub.

---

## Stack

| Besoin | Choix | Version |
|---|---|---|
| Framework | [Astro](https://astro.build) (site 100 % statique) + MDX | `astro` 7.4.0, `@astrojs/mdx` 8.1.0 |
| Style | Tailwind CSS v4 (via `@tailwindcss/vite`) + typography | `tailwindcss` 4.3.3, `@tailwindcss/typography` 0.5.20 |
| Polices | Inter et JetBrains Mono (variables, auto-hébergées) | `@fontsource-variable/*` 5.3 |
| Blocs de code | Expressive Code, options dans `ec.config.mjs` | `astro-expressive-code` 0.44.2 |
| Images | `astro:assets` (WebP au build) | `sharp` 0.35.5 |
| Recherche | Pagefind, index généré après le build | `pagefind` 1.5.2 |
| Sitemap | `@astrojs/sitemap` (FR/EN) | 3.7.4 |
| Flux RSS | `@astrojs/rss` (FR/EN) | 4.0.19 |
| Labs | Fichiers ContainerLab parsés avec `yaml` | `yaml` 2.9.1 |
| Logos | [Simple Icons](https://simpleicons.org) (CC0) + logos officiels : ContainerLab (BSD-3, © Nokia), NetBox (Apache 2.0), Arista (domaine public), Infoblox, Stormshield | Simple Icons 16.35.0 |
| Runtime | Node.js (voir `.nvmrc`) | 22.23.1 |
| Hébergement | Cloudflare Workers (static assets), déploiement auto à chaque push sur `main` | Wrangler 4.151 |

---

## Commandes

```bash
npm run dev       # http://localhost:4321 (la recherche n'a pas d'index en dev)
npm run build     # astro build && pagefind --site dist
npm run preview   # sert dist/ en local, recherche comprise
```

Toujours lancer `npm run build` avant de pousser : les erreurs de schéma y sont plus lisibles qu'en dev.

---

## Arborescence

```
.github/ISSUE_TEMPLATE/            # formulaires d'issue : erreur de contenu, suggestion de sujet
ec.config.mjs                      # options Expressive Code (thèmes clair/sombre sur la classe .dark)
wrangler.jsonc                     # Cloudflare : assets, 404, bloc "previews" (requis pour les PR)
public/
├── favicon.svg, favicon.ico, apple-touch-icon.png, icon-*.png, site.webmanifest
├── og-default.png                 # image de partage par défaut (1200×630)
├── logos/                         # logos disponibles en PNG seulement (utilisés en masque CSS)
└── labs/<lab>/topology.clab.yml + configs/*.cfg   # evpn-basic, static-routing
src/
├── content.config.js              # collections "tutorials" et "courses" (schéma Zod)
├── content/
│   ├── tutorials/{fr,en}/<slug>.mdx
│   └── courses/{fr,en}/<course>/{index.mdx, <chapter>.mdx}
├── assets/avatar.png              # photo de profil (optimisée au build)
├── components/
│   ├── HomePage, TutorialsPage, CoursesPage, CoursePage, ChapterPage, WhoamiPage
│   ├── ToolsPage, ToolPage, ToolCard           # page Outils + page dédiée par outil
│   ├── SubnetCalculator, VlsmPlanner, SubnetQuiz
│   ├── Term, TermOfTheDay                      # glossaire
│   ├── Search, ThemeToggle                     # header
│   ├── LogoMarquee, Faq, SupportCard           # accueil, fin d'article
│   ├── Callout, TutorialCard, Lab, ClabDiagram
│   ├── diagrams/                   # Topology, PacketFormat, Bits, AddressSpace, OsiModel, tones.ts
├── data/
│   ├── tools.ts                   # liste des outils (slug, textes, composant)
│   ├── glossary.ts                # définitions de <Term>
│   ├── brands.ts                  # logos du carrousel (id = vendor ou tag)
│   ├── startHere.ts               # « par où commencer » de l'accueil
│   ├── faq.ts, profile.ts, roadmap.ts
├── i18n/ui.ts                     # languages, routes, dictionnaire ui, t(), formatDate()
├── layouts/
│   ├── BaseLayout.astro           # head (SEO, OG, JSON-LD), header, footer
│   └── ArticleLayout.astro        # article + TOC + données structurées TechArticle
├── lib/
│   ├── content.ts, courses.ts     # tutoriels et formations (chemins, URLs, filtre techno)
│   ├── ipv4.ts                    # calculs IPv4 partagés par les outils
│   ├── seo.ts                     # URLs absolues, schémas schema.org
│   ├── mdx.ts                     # composants disponibles dans tous les MDX (Term)
│   ├── support.ts                 # liens Buy Me a Coffee et issues GitHub
│   ├── rss.ts                     # construction des flux RSS par langue
│   └── levels.ts
├── styles/global.css
└── pages/
    ├── index, 404, whoami, robots.txt.ts, rss.xml.ts
    ├── tutoriels/{index, [...slug]}   formations/{index, [course]/index, [course]/[chapter]}   outils/{index, [tool]}
    └── en/ (même structure : tutorials, courses, tools, rss.xml.ts)
```

---

## Conventions

- **Code en anglais**, contenu dans la langue de l'article. Les URLs de pages sont traduites (`/tutoriels` / `/en/tutorials`), les slugs de contenu sont en anglais et **identiques en FR et EN**.
- **Une traduction = même nom de fichier** dans `fr/` et `en/`. Le sélecteur de langue pointe vers la traduction si elle existe, sinon vers l'accueil de l'autre langue.
- **Pattern de page** : un composant bilingue `XxxPage.astro` qui reçoit `lang`, et des fichiers de route minimes dans `src/pages/` et `src/pages/en/`.
- **Textes d'interface** dans `src/i18n/ui.ts` (TypeScript signale une clé manquante dans une langue). **URLs** dans `routes` du même fichier.
- **Frontmatter obligatoire** : `title`, `description`, `pubDate`, `level` (`beginner` | `intermediate` | `advanced`). Les formations ajoutent `order`. Renseigner `vendor` et `tags` : ils alimentent le filtre par technologie et le carrousel.
- **Composants dans le MDX** : classe `not-prose` sur le conteneur racine. Disponibles sans import (voir `src/lib/mdx.ts`) :
  - `<Term id="nat" />` : terme du glossaire avec infobulle ;
  - `<Callout type="note|tip|warning|field">` : encart (à savoir, astuce, attention, retour terrain) ;
  - `<Topology nodes links flows groups notes />` : schéma réseau en SVG (routeurs, switches, hôtes, flux, zones) ;
  - `<PacketFormat rows cols />` : trame, en-tête ou champ de bits, sur une ou plusieurs lignes alignées ;
  - `<Bits ip prefix mask />` : adresse IPv4 en binaire, bits réseau / hôte ;
  - `<AddressSpace base subnets />` : découpage d'un bloc d'adresses à l'échelle ;
  - `<OsiModel />`, `<Lab name="…" />`.
- **Schémas** : un maximum de schémas dans chaque article. Les couleurs ont un sens constant : ambre = couche 2 / MAC, vert = couche 3 / IP, violet = données ou siège, rouge = erreur ou blocage.
- **Classes Tailwind écrites en entier** (jamais `bg-${color}-50`). Mode sombre : variante `dark:`, pilotée par la classe `.dark` sur `<html>`.
- **Alias** `@/` → `src/` (défini dans `tsconfig.json`) : `import Lab from '@/components/Lab.astro'`, quel que soit l'emplacement du fichier. Pas de `../`.
- **Nouvel outil** : un composant dans `src/components/`, une entrée dans `src/data/tools.ts`. La page dédiée, la carte et le sitemap suivent automatiquement.
- **Confidentialité** : aucun nom de client (employeurs cités : SQUAD, Devoteam, Malherbe). Dans les exemples : AS privés `65000-65535`, plages de documentation `192.0.2.0/24`, `198.51.100.0/24`.

---

## Référencement (SEO)

Déjà en place :

- `sitemap-index.xml` (généré au build) et `robots.txt` qui le déclare. Flux RSS déclarés dans le `<head>` de chaque page.
- URL canonique avec slash final sur chaque page (les paramètres comme `?tech=` sont ignorés), `hreflang` FR/EN + `x-default`.
- Open Graph et Twitter Card : `public/og-default.png` par défaut, ou image propre à la page via la prop `image` de `BaseLayout`.
- Données structurées (JSON-LD) : `WebSite` + `Person` (accueil), `TechArticle` + `BreadcrumbList` (tutoriels, chapitres), `Course` (formations), `WebApplication` (outils), `FAQPage`, `ProfilePage` (whoami).
- 404 en `noindex`.

Mise en route (une seule fois) :

1. **Google Search Console** : ajouter une propriété de type *Domaine* `alcpt.network`. La vérification se fait par un enregistrement TXT, à ajouter dans le DNS Cloudflare.
2. Dans *Sitemaps*, soumettre `https://nexthop.alcpt.network/sitemap-index.xml`.
3. *Inspection d'URL* : demander l'indexation de l'accueil et des pages principales (outils, tutoriels).
4. **Bing Webmaster Tools** : importer la propriété depuis Search Console (Bing alimente aussi DuckDuckGo et Ecosia).
5. Vérifier les données structurées avec le [test des résultats enrichis](https://search.google.com/test/rich-results) et l'aperçu LinkedIn avec le [Post Inspector](https://www.linkedin.com/post-inspector/).

---

## Pièges déjà rencontrés

- **Collection vide ou 404 sur un article** : remonter au premier message d'erreur du terminal. Le plus souvent un champ obligatoire manquant (`level`) ou un fichier mal placé.
- **Fichiers de route disparus** : vérifier que `[...slug].astro`, `[course]/index.astro`, `[course]/[chapter].astro` et `[tool].astro` existent bien (noms avec crochets, à créer entre guillemets simples).
- **Nouveau dossier de pages ou modif de `content.config.js`** : redémarrer `npm run dev`.
- **Le champ `site`** de `astro.config.mjs` sert au sitemap, aux `hreflang`, aux URLs canoniques et aux URLs `curl` des labs : il doit correspondre au domaine de production (et à `SITE` dans `src/lib/seo.ts`).
- **Options Expressive Code** : elles vont dans `ec.config.mjs`, pas dans `astro.config.mjs`. Une fonction (comme `themeCssSelector`) dans la config Astro fait échouer le composant `<Code>`.
- **Recherche vide en dev** : normal, l'index Pagefind n'existe qu'après `npm run build`. Tester avec `npm run preview`.
- **`pagefind` dans `package.json`** : la commande doit être dans `scripts.build`, sinon l'index n'est jamais généré en production.
- **Déploiement d'une PR qui échoue** (`missing a previews block`) : Cloudflare lance `wrangler preview` hors de `main`, ce qui exige `"previews": {}` dans `wrangler.jsonc`.
- **Formulaires d'issue GitHub** : ils ne sont actifs qu'une fois `.github/` sur `main`. Les étiquettes `contenu` et `suggestion` doivent exister dans le dépôt.

---

## Backlog

- [x] Page Outils + déplacement du calculateur
- [x] Outils : découpeur VLSM, quiz de subnetting
- [x] Glossaire avec infobulles (`<Term>`)
- [x] UI de recherche Pagefind
- [x] Bouton clair/sombre
- [x] Open Graph / partage LinkedIn, données structurées, `robots.txt`
- [x] Accueil : carrousel des technologies, chiffres, par où commencer, terme du jour, FAQ
- [x] Favicon, Buy Me a Coffee, signalement d'erreur via GitHub
- [x] Flux RSS FR/EN
- [x] Logos Arista, NetBox, Infoblox et Stormshield dans le carrousel
- [ ] Search Console + Bing Webmaster Tools (voir « Référencement »)
- [x] Composant `<Callout>` et composants de schémas (`Topology`, `PacketFormat`, `Bits`, `AddressSpace`)
- [x] Formation Fondamentaux complète en FR (6 chapitres illustrés + lab `static-routing`)
- [ ] Composant `<CliOutput>` (sortie CLI annotée)
- [ ] Images Open Graph propres à chaque article (générées au build)
- [ ] Traduction anglaise de la formation Fondamentaux
- [ ] Remplacer les sorties CLI d'exemple par de vraies sorties de lab (`evpn-basic`, Fondamentaux : `show mac address-table`, `show vlan`, `show spanning-tree`, `show ip route`)
- [ ] Formation suivante : le routage dynamique (OSPF, BGP)
- [ ] Supprimer `src/components/LangSwitcher.astro` (inutilisé)

---

## Idées d'outils

Tous fonctionnent dans le navigateur, sans serveur, comme les outils existants. Pour en ajouter un :
un composant dans `src/components/` et une entrée dans `src/data/tools.ts`.

**Déjà en ligne** : calculateur de sous-réseau IPv4, découpeur VLSM, quiz de subnetting.

| Priorité | Outil | Ce qu'il fait | Effort |
|---|---|---|---|
| Haute | Calculateur IPv6 | Forme courte / complète, préfixe, nombre de /64, type (link-local, ULA, globale), EUI-64 depuis une MAC | Moyen |
| Haute | Convertisseur binaire / hexa / décimal | Conversion d'un octet ou d'une adresse, avec le poids de chaque bit | Faible |
| Haute | Visualiseur ContainerLab | Coller un `topology.clab.yml` et obtenir le schéma (réutilise `ClabDiagram`) | Faible |
| Haute | Calculateur MTU / overhead | Empiler les en-têtes (802.1Q, IP, UDP, VXLAN, GRE, IPsec…) et obtenir MTU utile et MSS TCP | Moyen |
| Moyenne | Formateur d'adresse MAC | Formats Linux / Cisco / Windows, unicast/multicast, universelle/locale (option : constructeur via l'OUI) | Faible |
| Moyenne | Résumé de routes | Plus petit agrégat d'une liste de préfixes, avec l'explication en binaire | Moyen |
| Moyenne | Générateur de wildcard / ACL | Réseau ou plage → masque inverse et ligne d'ACL Cisco / Arista | Faible |
| Moyenne | Calculateur débit / temps de transfert | « 50 Go sur 100 Mb/s : combien de temps ? », bits et octets | Faible |
| Spécifique | Décodeur de route EVPN | Expliquer chaque champ d'une route EVPN (type, RD, ESI, MAC, IP) | Moyen à élevé |
| Spécifique | Générateur de plan VNI / VLAN | Règle de numérotation → tableau et extrait YAML pour AVD | Moyen |
| Spécifique | Décodeur de certificat X.509 / CSR | CN, SAN, dates, émetteur, taille de clé, sans que rien ne quitte le navigateur | Moyen |
| Spécifique | Référence ports et protocoles | Tableau consultable port → protocole, avec lien vers le glossaire | Faible |

---

## Prompt pour la prochaine session

> À copier-coller au début de la prochaine conversation, avec ce README.

```text
Je travaille sur Next Hop, mon blog réseau et sécurité bilingue FR/EN en Astro,
déployé sur Cloudflare Workers. Le README ci-joint décrit la stack, l'arborescence,
les conventions et les pièges déjà rencontrés : respecte-les.

Tâche : <à compléter, par exemple le prochain élément du backlog>

Attendus : fichiers complets, commandes pour créer les fichiers,
npm run build qui passe, et checklist de test (FR, EN, sélecteur de langue,
mode sombre, mobile).
```
