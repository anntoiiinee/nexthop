import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type Lang } from '@/i18n/ui';

export const slugOf = (id: string) => id.split('/').slice(1).join('/');

export const tutorialUrl = (lang: Lang, slug: string) =>
  lang === 'fr' ? `/tutoriels/${slug}` : `/en/tutorials/${slug}`;

/** Technologies d'un tutoriel : constructeurs (`vendor`) + tags, pour le filtre ?tech= */
export const techsOf = (post: CollectionEntry<'tutorials'>) => [...post.data.vendor, ...post.data.tags];

/** Liste des tutoriels filtrée sur une technologie (logo du carrousel, puces de filtre). */
export const techUrl = (lang: Lang, tech: string) => `${routes.tutorials[lang]}?tech=${encodeURIComponent(tech)}`;

export async function getTutorials(lang: Lang) {
  const posts = await getCollection('tutorials',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTutorialPaths(lang: Lang) {
  const otherLang: Lang = lang === 'fr' ? 'en' : 'fr';
  const posts = await getTutorials(lang);
  const translated = new Set((await getTutorials(otherLang)).map((p) => slugOf(p.id)));

  const paths = posts.map((post) => {
    const slug = slugOf(post.id);
    const alternates: Partial<Record<Lang, string>> = { [lang]: tutorialUrl(lang, slug) };
    if (translated.has(slug)) alternates[otherLang] = tutorialUrl(otherLang, slug);
    return { params: { slug }, props: { post, alternates } };
  });

  return paths;
}