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
- **Outils interactifs**, 100 % côté navigateur : calculateur de sous-réseau, découpeur VLSM (plan partageable par URL, export CSV), quiz de subnetting, décodeur de certificat X.509 / CSR, référence ports et protocoles.
- **Partage** : boutons LinkedIn, X, Bluesky, Reddit, e-mail, copie du lien et partage natif (mobile), sans script tiers.
- **Glossaire** : `<Term id="nat" />` souligne le terme en pointillés et affiche sa définition au survol.
- **Labs ContainerLab** : topologies dans `public/labs/`, schéma généré automatiquement, commande `curl` prête à copier.
- **Recherche** Pagefind (Ctrl/⌘+K), limitée à la langue de la page.
- **Flux RSS** FR (`/rss.xml`) et EN (`/en/rss.xml`) : tutoriels et chapitres de formation.
- **Thème clair/sombre** : suit le système par défaut, choix mémorisé, sans flash au chargement.
- **Accueil** : chiffres du site, « par où commencer » par profil, carrousel des technologies, carrousel des outils, terme du jour, FAQ.
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
npm ci            # installe les dépendances exactement comme dans package-lock.json
npm run dev       # http://localhost:4321 (la recherche n'a pas d'index en dev)
npm run build     # astro build && pagefind --site dist
npm run preview   # sert dist/ en local, recherche comprise
```

Toujours lancer `npm run build` avant de pousser : les erreurs de schéma y sont plus lisibles qu'en dev.

`npm ci` est à lancer après un clone, un `git pull` qui modifie `package-lock.json`, ou quand `node_modules` est
abîmé : il supprime `node_modules` et réinstalle les versions exactes du `package-lock.json`, sans jamais le modifier.
C'est la commande reproductible : tout le monde obtient les mêmes versions. `npm install` sert, lui, à ajouter ou
mettre à jour un paquet : il peut réécrire le `package-lock.json`, qu'il faut alors commiter.

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
└── labs/<lab>/topology.clab.yml + configs/*.cfg   # evpn-basic, static-routing, ospf-basic, bgp-basic, netops (scripts Python/Ansible), proxy-lb (Squid, HAProxy, nginx, PKI), security (nftables, strongSwan)
src/
├── content.config.js              # collections "tutorials" et "courses" (schéma Zod)
├── content/
│   ├── tutorials/{fr,en}/<slug>.mdx
│   └── courses/{fr,en}/<course>/{index.mdx, <chapter>.mdx}
├── assets/avatar.png              # photo de profil (optimisée au build)
├── components/
│   ├── HomePage, TutorialsPage, CoursesPage, CoursePage, ChapterPage, WhoamiPage
│   ├── ToolsPage, ToolPage, ToolCard, ToolCarousel  # page Outils, page dédiée, carrousel de l'accueil
│   ├── SubnetCalculator, VlsmPlanner, SubnetQuiz, CertDecoder, PortsReference
│   ├── Term, TermOfTheDay                      # glossaire
│   ├── Search, ThemeToggle                     # header
│   ├── LogoMarquee, Faq, SupportCard           # accueil, fin d'article
│   ├── Callout, TutorialCard, Lab, ClabDiagram
│   ├── diagrams/                   # Topology, Sequence, PacketFormat, Bits, AddressSpace, OsiModel, tones.ts
├── data/
│   ├── tools.ts                   # liste des outils (slug, textes, composant)
│   ├── glossary.ts                # définitions de <Term>
│   ├── ports.ts                   # référence ports et protocoles (registre IANA)
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
  - `<Sequence actors messages />` : diagramme de séquence (poignée de main TLS, échanges entre client, proxy et serveur) ;
  - `<PacketFormat rows cols />` : trame, en-tête ou champ de bits, sur une ou plusieurs lignes alignées ;
  - `<Bits ip prefix mask />` : adresse IPv4 en binaire, bits réseau / hôte ;
  - `<AddressSpace base subnets />` : découpage d'un bloc d'adresses à l'échelle ;
  - `<OsiModel />`, `<Lab name="…" />` ;
  - `<CodeFile lab="netops" file="python/backup_configs.py" />` : affiche un fichier d'un lab (le code montré est celui téléchargé).
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
- Open Graph et Twitter Card : image 1200×630 propre à chaque tutoriel, chapitre, formation et outil, générée au build par `src/pages/og/[...path].png.ts` (Satori + sharp, mise en page dans `src/lib/og.ts`) ; `public/og-default.png` pour les autres pages.
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

- **`sh: 1: astro: not found`** au lancement de `npm run dev` ou `npm run build` : les dépendances ne sont pas
  installées (`node_modules` absent, après un clone ou une suppression). Lancer `npm ci`.
- **Collection vide ou 404 sur un article** : remonter au premier message d'erreur du terminal. Le plus souvent un champ obligatoire manquant (`level`) ou un fichier mal placé.
- **Fichiers de route disparus** : vérifier que `[...slug].astro`, `[course]/index.astro`, `[course]/[chapter].astro` et `[tool].astro` existent bien (noms avec crochets, à créer entre guillemets simples).
- **Nouveau dossier de pages ou modif de `content.config.js`** : redémarrer `npm run dev`.
- **Le champ `site`** de `astro.config.mjs` sert au sitemap, aux `hreflang`, aux URLs canoniques et aux URLs `curl` des labs : il doit correspondre au domaine de production (et à `SITE` dans `src/lib/seo.ts`).
- **Options Expressive Code** : elles vont dans `ec.config.mjs`, pas dans `astro.config.mjs`. Une fonction (comme `themeCssSelector`) dans la config Astro fait échouer le composant `<Code>`.
- **Recherche vide en dev** : normal, l'index Pagefind n'existe qu'après `npm run build`. Tester avec `npm run preview`.
- **`pagefind` dans `package.json`** : la commande doit être dans `scripts.build`, sinon l'index n'est jamais généré en production.
- **Déploiement d'une PR qui échoue** (`missing a previews block`) : Cloudflare lance `wrangler preview` hors de `main`, ce qui exige `"previews": {}` dans `wrangler.jsonc`.
- **Lien symbolique `node_modules` commité par erreur** : le motif `node_modules/` (avec barre finale) n'ignore que les
  dossiers. Un lien du même nom a été commité, puis a remplacé le vrai dossier au `git pull` et cassé le build Cloudflare.
  Le `.gitignore` utilise désormais `node_modules` ; toujours relire `git status` avant de commiter.
- **Clés privées dans un lab** : tout ce qui est dans `public/` est publié et listé par `<Lab>` dans la commande
  `curl`. Les certificats et clés d'un lab sont générés chez le lecteur par un script (`pki/make-pki.sh` du lab
  `proxy-lb`) dans un dossier ignoré par Git (`pki/out/`) : supprimer ce dossier en local avant un `npm run build`.
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
- [x] Formation Fondamentaux complète en FR (10 chapitres illustrés, dont ARP, LLDP/CDP, agrégation de liens et TCP/UDP, + lab `static-routing`)
- [ ] Composant `<CliOutput>` (sortie CLI annotée) 
- [x] Images Open Graph propres à chaque article (générées au build) + boutons de partage
- [x] Outil : décodeur de certificat X.509 / CSR
- [x] Traduction anglaise des formations Fondamentaux et Routage dynamique
- [ ] Remplacer les sorties CLI d'exemple par de vraies sorties de lab (`evpn-basic`, Fondamentaux : `show mac address-table`, `show vlan`, `show spanning-tree`, `show ip route`)
- [x] Formation Routage dynamique en FR (5 chapitres : principes, OSPF, BGP bases / attributs / politiques + labs `ospf-basic` et `bgp-basic`)
- [x] Formation Automatisation en FR (7 chapitres : Python, Ansible, sauvegardes GitOps, rotation du compte de secours, conventions de nommage et IPAM, NetBox, AVD + lab `netops`)
- [ ] Formation Data center (VRF, spine/leaf, VXLAN, EVPN) : rédaction par Antoine
- [ ] Traduction anglaise de la formation Automatisation
- [ ] Supprimer `src/components/LangSwitcher.astro` (inutilisé)
- [x] Tutoriel « Monter son lab » (ContainerLab, cEOS, Cisco, commandes) en FR et EN, lié depuis chaque lab et depuis la FAQ
- [x] Page Outils : section « Outils de la communauté » (`src/data/communityTools.ts`), avec eos-downloader de TiTom73 ; toujours créditer l'auteur et la licence du projet
- [x] Saut 7 · Services et observabilité : page de présentation et chapitre « Management et accès hors bande » (`oob`) en FR et EN, exercice dans le lab `netops`
- [x] Formation Automatisation : chapitre « Conventions de nommage et IPAM » (`naming-ipam`, avant NetBox), avec `conventions.yml` et `python/check_conventions.py` dans le lab `netops`
- [x] Saut 6 · Proxy et load balancing complet en FR et EN : 5 chapitres (proxy sortant, TLS et inspection, reverse proxy, load balancing et F5, WAF), lab `proxy-lb` (Squid, HAProxy, nginx, PKI générée par `pki/make-pki.sh`), composant `<Sequence>`
- [x] Saut 5 · La sécurité complet en FR et EN : 4 chapitres (bases d'un firewall, politiques de sécurité, VPN IPsec, segmentation), multi-constructeur (FortiGate, Palo Alto, Stormshield), lab `security` (firewalls Linux nftables + strongSwan en VPN par route VTI, routeur cEOS)
- [ ] Formation Data center : un passage sur le management de la fabric (switch de management par baie, Management0 en VRF MGMT) renvoyant vers le chapitre `oob`
- [ ] Contenus à venir : Jinja2 en détail, Vault, DDI, télémétrie gNMIc / Prometheus / Grafana (voir la section suivante)

---

## Contenus à venir

Sujets validés, à rédiger. Pour chacun : où il s'insère, ce qu'il faut couvrir, et les schémas ou le lab à prévoir.

Le parcours compte **8 sauts** (`src/data/roadmap.ts`) : 1 Fondamentaux · 2 Routage dynamique · 3 Data center ·
4 Automatisation · 5 Sécurité · **6 Proxy et load balancing** (`proxy`) · **7 Services et observabilité** (`operations`) ·
**8 Le réseau dans le cloud** (`cloud`). Les sauts 7 et 8 apparaissent déjà sur l'accueil, avec leurs chapitres pas encore écrits marqués « bientôt ».

### Formation Automatisation : Jinja2 en détail (nouveau chapitre, après Ansible)

- Syntaxe : variables `{{ }}`, blocs `{% %}`, commentaires, boucles, conditions, filtres (`default`, `join`, `ipaddr`
  / `ansible.utils.ipaddr`, `upper`…), tests, macros, `include` et héritage de gabarits.
- Maîtriser les espaces et les sauts de ligne (`trim_blocks`, `lstrip_blocks`, `{%-`) : le piège n°1 des configurations générées.
- Séparer données (YAML, NetBox) et gabarits ; un gabarit par fonction (interfaces, BGP, SNMP…).
- Tester un gabarit hors équipement (rendu local en Python, `ansible.builtin.template` vers un fichier, diff).
- Fichiers d'exemple à ajouter au lab `netops` (`templates/`) et affichés avec `<CodeFile>`.

### Formation Automatisation : les secrets et Vault (nouveau chapitre, ou approfondissement du chapitre Ansible)

- Ansible Vault en détail : `create`, `edit`, `view`, `encrypt_string`, `rekey`, plusieurs coffres avec `--vault-id`,
  fichier de mot de passe, intégration CI (variable de type File).
- Les limites d'Ansible Vault (un mot de passe partagé, pas de journal d'accès) et les gestionnaires de secrets :
  HashiCorp Vault (moteur KV, politiques, jetons, `community.hashi_vault`), CyberArk, Bitwarden.
- Bonnes pratiques : aucun secret dans Git en clair, rotation, moindre privilège, secrets différents par environnement.
- Leçon tirée du chapitre de rotation : un filtre `vault` d'Ansible 2.21 peut être redéchiffré à l'écriture ; tester que
  le fichier produit commence bien par `$ANSIBLE_VAULT`.

### Saut 7 · Services et observabilité : l'infrastructure DDI (chapitre `ddi`)

- DDI = **DNS, DHCP, IPAM** gérés ensemble : pourquoi les réunir (une adresse attribuée par DHCP est enregistrée dans
  l'IPAM et le DNS automatiquement), et ce que coûte leur séparation (doublons, enregistrements périmés).
- DNS : résolution, zones, enregistrements A/AAAA/PTR/CNAME, résolveurs internes, DNS split-horizon.
- DHCP : DORA, étendues, réservations, options (passerelle, DNS), relais (`ip helper-address`), DHCP Snooping
  (renvoi vers le chapitre ARP).
- Les solutions : Infoblox (dans le carrousel), EfficientIP, BlueCat, Microsoft DNS/DHCP + IPAM, alternatives libres
  (Kea, PowerDNS, NetBox pour l'IPAM).
- Automatisation : API Infoblox (WAPI), collection Ansible, synchronisation avec NetBox.
- Schémas : échange DHCP DORA, résolution DNS récursive, flux DDI intégré.

### Saut 7 · Services et observabilité : SNMP, syslog et NetFlow (chapitre `monitoring`)

- La supervision « classique », encore partout : SNMP (MIB, OID, v2c vs v3 et son chiffrement), traps, syslog
  (sévérités, serveur central, horodatage NTP indispensable), NetFlow / IPFIX / sFlow (qui parle à qui, en quel volume).
- Ce qu'elle ne sait pas bien faire (fréquence d'interrogation, charge CPU), qui justifie la télémétrie du chapitre suivant.
- Outils : LibreNMS, Zabbix, collecteurs NetFlow.

### Saut 7 · Services et observabilité : télémétrie avec gNMIc, Prometheus et Grafana (chapitres `telemetry` et `prometheus-grafana`)

- Pourquoi la télémétrie en streaming plutôt que SNMP en interrogation : fréquence, volume, modèles OpenConfig, push.
- gNMI et OpenConfig : abonnements (`sample`, `on-change`), chemins (`/interfaces/interface/state/counters`).
- **gNMIc** : collecte depuis les équipements (activer `management api gnmi` sur EOS), fichier de configuration,
  sortie vers Prometheus.
- **Prometheus** : modèle de données (séries temporelles, labels), requêtes PromQL de base (`rate()` sur les compteurs
  d'interfaces), alertes.
- **Grafana** : tableaux de bord, variables, et une **weather map** du réseau (débit des liens en couleur).
- Lab : ajouter gNMIc, Prometheus et Grafana au lab `netops` (conteneurs dans la même topologie ContainerLab).
- Retour terrain : weather map temps réel d'une fabric, détection d'un lien saturé avant les utilisateurs.

### Saut 8 · Le réseau dans le cloud

Le dernier saut ferme le parcours « du câble au cloud » et réutilise les précédents (routage, BGP, IPsec, Terraform).
Exemples sur **AWS**, avec les équivalents Azure et GCP signalés. Le lab ne peut pas être un lab ContainerLab : prévoir
du Terraform à appliquer sur un compte gratuit (offre Free Tier), avec un `terraform destroy` rappelé à chaque fois, et
une mise en garde sur les coûts (NAT Gateway, Transit Gateway et VPN sont facturés à l'heure).

- **Les bases du réseau AWS** (`aws-vpc`) : régions et zones de disponibilité, VPC et plan d'adressage (lien avec le
  chapitre IPv4 et le découpeur VLSM), sous-réseaux publics et privés, tables de routage, Internet Gateway, NAT Gateway,
  adresses Elastic IP ; ce qui change par rapport à un réseau classique (pas de broadcast, pas de VLAN, routeur implicite).
- **Security groups et NACL** (`security-groups`) : firewall avec état (security group, attaché à l'interface) et sans
  état (NACL, attachée au sous-réseau), référencer un groupe plutôt qu'une adresse, VPC Flow Logs pour le dépannage.
- **Interconnecter des VPC** (`transit-gateway`) : VPC peering (non transitif) puis Transit Gateway (hub, tables de
  routage par attachement), PrivateLink pour exposer un service sans router tout le VPC ; architecture hub and spoke.
- **Le cloud hybride : VPN et Direct Connect** (`hybrid-cloud`) : VPN site à site IPsec avec BGP vers le data center
  (renvoi aux sauts 2 et 5), Direct Connect pour un lien dédié, redondance et choix du chemin (LOCAL_PREF, AS-path
  prepending, comme au chapitre sur les attributs BGP).
- **Le réseau en code avec Terraform** (`terraform`) : fournisseurs, ressources, état (`terraform.tfstate`, à stocker
  à distance et à protéger), `plan` / `apply` / `destroy`, modules ; un VPC complet décrit en code et déployé par un
  pipeline, dans la continuité du saut Automatisation.

---

## Idées d'outils

Tous fonctionnent dans le navigateur, sans serveur, comme les outils existants. Pour en ajouter un :
un composant dans `src/components/` et une entrée dans `src/data/tools.ts`.

**Déjà en ligne** : calculateur de sous-réseau IPv4, découpeur VLSM, quiz de subnetting, décodeur de certificat X.509 / CSR, référence ports et protocoles.

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
| Spécifique | ~~Décodeur de certificat X.509 / CSR~~ (fait) | CN, SAN, dates, émetteur, taille de clé, sans que rien ne quitte le navigateur | Moyen |
| Spécifique | ~~Référence ports et protocoles~~ (fait) | Tableau consultable port → protocole, avec lien vers le glossaire | Faible |

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
