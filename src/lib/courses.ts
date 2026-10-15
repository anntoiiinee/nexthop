import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type Lang } from '../i18n/ui';

export type CourseEntry = CollectionEntry<'courses'>;
export interface Course {
  slug: string;
  landing: CourseEntry;
  chapters: CourseEntry[];
}

const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
export const courseSlugOf = (e: CourseEntry) => e.id.split('/')[1];
export const chapterSlugOf = (e: CourseEntry) => e.id.split('/').slice(2).join('/');
const withoutLang = (id: string) => id.slice(3); // "fr/fundamentals/osi" → "fundamentals/osi"

export const courseUrl = (lang: Lang, course: string) => `${routes.courses[lang]}/${course}`;
export const chapterUrl = (lang: Lang, course: string, chapter: string) =>
  `${courseUrl(lang, course)}/${chapter}`;

export async function getCourseEntries(lang: Lang) {
  return getCollection('courses', ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
}

export async function getCourses(lang: Lang): Promise<Course[]> {
  const entries = await getCourseEntries(lang);
  return entries
    .filter((e) => e.data.order === 0)
    .map((landing) => {
      const slug = courseSlugOf(landing);
      const chapters = entries
        .filter((e) => courseSlugOf(e) === slug && e.data.order > 0)
        .sort((a, b) => a.data.order - b.data.order);
      return { slug, landing, chapters };
    });
}

// Chapitres et formations publiés, sous la forme "fundamentals/osi" et "fundamentals"
export async function getPublished(lang: Lang) {
  const courses = await getCourses(lang);
  return {
    courses: new Set(courses.map((c) => c.slug)),
    chapters: new Set(courses.flatMap((c) => c.chapters.map((ch) => withoutLang(ch.id)))),
  };
}

export async function getCoursePaths(lang: Lang) {
  const other = otherLang(lang);
  const translated = (await getPublished(other)).courses;
  return (await getCourses(lang)).map((course) => {
    const alternates: Partial<Record<Lang, string>> = { [lang]: courseUrl(lang, course.slug) };
    if (translated.has(course.slug)) alternates[other] = courseUrl(other, course.slug);
    return { params: { course: course.slug }, props: { course, alternates } };
  });
}

export async function getChapterPaths(lang: Lang) {
  const other = otherLang(lang);
  const translated = (await getPublished(other)).chapters;
  return (await getCourses(lang)).flatMap((course) =>
    course.chapters.map((chapter, index) => {
      const slug = chapterSlugOf(chapter);
      const alternates: Partial<Record<Lang, string>> = { [lang]: chapterUrl(lang, course.slug, slug) };
      if (translated.has(withoutLang(chapter.id))) alternates[other] = chapterUrl(other, course.slug, slug);
      return { params: { course: course.slug, chapter: slug }, props: { course, chapter, index, alternates } };
    })
  );
}