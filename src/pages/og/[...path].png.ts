// Image Open Graph de chaque contenu, générée au build : /og/<collection>/<id>.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage, type OgContent } from '@/lib/og';
import { tools } from '@/data/tools';
import type { Lang } from '@/i18n/ui';

const LABELS: Record<Lang, { tutorial: string; course: string; chapter: string; tool: string }> = {
  fr: { tutorial: 'Tutoriel', course: 'Formation', chapter: 'Chapitre', tool: 'Outil' },
  en: { tutorial: 'Tutorial', course: 'Course', chapter: 'Chapter', tool: 'Tool' },
};

export const getStaticPaths = (async () => {
  const paths: { params: { path: string }; props: { content: OgContent } }[] = [];

  for (const post of await getCollection('tutorials', ({ data }) => !data.draft)) {
    const lang = post.id.split('/')[0] as Lang;
    const { title, description, level, tags } = post.data;
    paths.push({ params: { path: `tutorials/${post.id}` }, props: { content: { lang, kicker: LABELS[lang].tutorial, title, description, level, tags } } });
  }

  const courses = await getCollection('courses', ({ data }) => !data.draft);
  for (const entry of courses) {
    const [lang, course] = entry.id.split('/') as [Lang, string];
    const { title, description, level, tags, order } = entry.data;
    // La présentation d'une formation (index.mdx) a pour identifiant « fr/fundamentals »
    const landing = courses.find((c) => c.id === `${lang}/${course}` || c.id === `${lang}/${course}/index`);
    // Numéro affiché = rang parmi les chapitres publiés, comme sur la page du chapitre
    const rank = courses.filter((c) => c.id.startsWith(`${lang}/${course}/`) && c.data.order > 0 && c.data.order <= order).length;
    const kicker = order === 0
      ? LABELS[lang].course
      : `${landing?.data.title ?? LABELS[lang].course} · ${LABELS[lang].chapter} ${rank}`;
    paths.push({ params: { path: `courses/${entry.id}` }, props: { content: { lang, kicker, title, description, level, tags } } });
  }

  for (const tool of tools) {
    for (const lang of ['fr', 'en'] as Lang[]) {
      paths.push({
        params: { path: `tools/${lang}/${tool.slug}` },
        props: { content: { lang, kicker: LABELS[lang].tool, title: tool.title[lang], description: tool.description[lang], tags: tool.tags } },
      });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOgImage((props as { content: OgContent }).content)), {
    headers: { 'Content-Type': 'image/png' },
  });
