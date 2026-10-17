// Référencement : URLs absolues normalisées et données structurées (schema.org, JSON-LD).
import { routes, type Lang } from '@/i18n/ui';
import { profile } from '@/data/profile';

export const SITE = 'https://nexthop.alcpt.network'; // identique à `site` dans astro.config.mjs
export const SITE_NAME = 'Next Hop';
export const DEFAULT_IMAGE = '/og-default.png';

/** Image Open Graph propre à un contenu, générée au build par src/pages/og/[...path].png.ts */
export const ogImagePath = (collection: 'tutorials' | 'courses' | 'tools', id: string) => `/og/${collection}/${id}.png`;

export const ogLocale: Record<Lang, string> = { fr: 'fr_FR', en: 'en_US' };

/**
 * URL absolue avec slash final : les pages sont générées en dossiers (outils/index.html)
 * et Cloudflare redirige /outils vers /outils/. Canonical, hreflang et og:url pointent
 * donc directement vers l'URL finale, la même que dans le sitemap.
 */
export function absoluteUrl(path: string) {
  const url = new URL(path, SITE);
  if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) url.pathname += '/';
  return url.toString();
}

export const authorSchema = (lang: Lang) => ({
  '@type': 'Person',
  '@id': `${SITE}/#author`,
  name: profile.name,
  jobTitle: 'IT Network Specialist',
  url: absoluteUrl(routes.whoami[lang]),
  sameAs: [profile.links.linkedin, profile.links.github],
});

export const websiteSchema = (lang: Lang, description: string) => ({
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: SITE_NAME,
  url: absoluteUrl(routes.home[lang]),
  description,
  inLanguage: lang,
  author: { '@id': `${SITE}/#author` },
});

/** Fil d'Ariane pour les résultats Google : [{ name, path }, …] */
export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
