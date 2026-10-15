import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

export const slugOf = (id: string) => id.split('/').slice(1).join('/');

export const tutorialUrl = (lang: Lang, slug: string) =>
  lang === 'fr' ? `/tutoriels/${slug}` : `/en/tutorials/${slug}`;

export async function getTutorials(lang: Lang) {
  const posts = await getCollection('tutorials',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTutorialPaths(lang: Lang) {
  const otherLang: Lang = lang === 'fr' ? 'en' : 'fr';
  const posts = await getTutorials(lang);
  const translated = new Set((await getTutorials(otherLang)).map((p) => slugOf(p.id)));

  return posts.map((post) => {
    const slug = slugOf(post.id);
    const alternates: Partial<Record<Lang, string>> = { [lang]: tutorialUrl(lang, slug) };
    if (translated.has(slug)) alternates[otherLang] = tutorialUrl(otherLang, slug);
    return { params: { slug }, props: { post, alternates } };
  });
}