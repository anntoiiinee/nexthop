// Date de mise à jour des tutoriels et des formations.
// Priorité : `updatedDate` du frontmatter s'il est renseigné, sinon la date du dernier commit Git
// qui a touché le fichier. Un fichier qui n'a qu'un seul commit (sa création) n'est pas « mis à jour ».
// Si le dépôt est un clone superficiel (shallow), l'historique est incomplet : seule la date manuelle compte.
import { execFileSync } from 'node:child_process';
import type { Course } from '@/lib/courses';

interface Dated {
  filePath?: string;
  data: { pubDate: Date; updatedDate?: Date };
}

const git = (args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

const historyAvailable = (() => {
  try {
    return git(['rev-parse', '--is-shallow-repository']) === 'false';
  } catch {
    return false; // pas de Git (archive, conteneur sans .git…)
  }
})();

const cache = new Map<string, Date | undefined>();

/** Date du dernier commit d'un fichier, seulement s'il a été modifié après sa création. */
function gitUpdatedDate(filePath?: string): Date | undefined {
  if (!filePath || !historyAvailable) return undefined;
  if (cache.has(filePath)) return cache.get(filePath);
  let date: Date | undefined;
  try {
    const commits = git(['log', '--format=%cI', '--', filePath]).split('\n').filter(Boolean);
    if (commits.length > 1) date = new Date(commits[0]);
  } catch {
    date = undefined;
  }
  cache.set(filePath, date);
  return date;
}

// Jour calendaire à Paris (AAAA-MM-JJ), quel que soit le fuseau de la machine de build
const parisDay = (d: Date) => d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Paris' });
const sameDay = (a: Date, b: Date) => parisDay(a) === parisDay(b);

/** Date de mise à jour à afficher, ou undefined si le contenu n'a pas changé depuis sa publication. */
export function updatedDateOf(entry: Dated): Date | undefined {
  const date = entry.data.updatedDate ?? gitUpdatedDate(entry.filePath);
  return date && date > entry.data.pubDate && !sameDay(date, entry.data.pubDate) ? date : undefined;
}

/** Une formation est mise à jour quand sa présentation ou l'un de ses chapitres l'est (ou quand un chapitre est ajouté). */
export function courseDates(course: Course): { created: Date; updated?: Date } {
  const created = course.landing.data.pubDate;
  const latest = [course.landing, ...course.chapters]
    .map((entry) => updatedDateOf(entry) ?? entry.data.pubDate)
    .reduce((max, d) => (d > max ? d : max), created);
  return { created, updated: latest > created && !sameDay(latest, created) ? latest : undefined };
}
