// Flux RSS par langue : tutoriels + chapitres de formation publiés, du plus récent au plus ancien.
import rss from '@astrojs/rss';
import { routes, t, type Lang } from '@/i18n/ui';
import { getTutorials, slugOf, tutorialUrl } from '@/lib/content';
import { getCourses, chapterUrl, chapterSlugOf } from '@/lib/courses';
import { absoluteUrl, SITE_NAME } from '@/lib/seo';
import { profile } from '@/data/profile';

export const rssUrl = (lang: Lang) => (lang === 'fr' ? '/rss.xml' : '/en/rss.xml');

export async function buildFeed(lang: Lang) {
  const tutorials = (await getTutorials(lang)).filter((post) => !post.data.wip).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    link: absoluteUrl(tutorialUrl(lang, slugOf(post.id))),
    categories: [...post.data.vendor, ...post.data.tags],
  }));

  const chapters = (await getCourses(lang)).flatMap((course) =>
    course.chapters.map((chapter) => ({
      title: `${course.landing.data.title} · ${chapter.data.title}`,
      description: chapter.data.description,
      pubDate: chapter.data.pubDate,
      link: absoluteUrl(chapterUrl(lang, course.slug, chapterSlugOf(chapter))),
      categories: [t(lang, 'courses.title'), ...chapter.data.tags],
    }))
  );

  return rss({
    title: `${SITE_NAME} · ${t(lang, 'site.tagline')}`,
    description: t(lang, 'site.description'),
    site: absoluteUrl(routes.home[lang]),
    items: [...tutorials, ...chapters].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
    customData: [
      `<language>${lang === 'fr' ? 'fr-fr' : 'en-us'}</language>`,
      `<copyright>© ${new Date().getFullYear()} ${profile.name}</copyright>`,
      `<atom:link href="${absoluteUrl(rssUrl(lang))}" rel="self" type="application/rss+xml" />`,
    ].join(''),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    trailingSlash: true,
  });
}
