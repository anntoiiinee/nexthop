// Progression du lecteur : les chapitres marqués comme lus, gardés dans son navigateur (localStorage).
// Rien n'est envoyé à un serveur. La clé d'un chapitre ne dépend pas de la langue ("fundamentals/osi"),
// si bien que la progression est commune aux versions française et anglaise.

export const PROGRESS_KEY = 'nexthop-progress';
export const PROGRESS_EVENT = 'nexthop:progress';

/** Chapitre → date (ms) à laquelle il a été marqué comme lu */
export type Progress = Record<string, number>;

/** Accès au stockage, remplaçable dans les tests */
export interface Store {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const browserStore = (): Store | null => {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null; // stockage bloqué (navigation privée stricte, paramètres du navigateur)
  }
};

export function readProgress(store: Store | null = browserStore()): Progress {
  if (!store) return {};
  try {
    const parsed = JSON.parse(store.getItem(PROGRESS_KEY) ?? '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    // On ne garde que des entrées valides : une clé "formation/chapitre" et une date numérique
    return Object.fromEntries(
      Object.entries(parsed).filter(([k, v]) => /^[a-z0-9-]+\/[a-z0-9-]+$/.test(k) && typeof v === 'number'),
    ) as Progress;
  } catch {
    return {};
  }
}

export function writeProgress(progress: Progress, store: Store | null = browserStore()): boolean {
  if (!store) return false;
  try {
    store.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false; // quota dépassé ou stockage bloqué : la page continue de fonctionner sans progression
  }
}

export function setRead(id: string, read: boolean, store: Store | null = browserStore(), now = Date.now()): Progress {
  const progress = readProgress(store);
  if (read) progress[id] = now;
  else delete progress[id];
  writeProgress(progress, store);
  return progress;
}

/** Nombre de chapitres lus parmi une liste */
export const countRead = (progress: Progress, ids: string[]) => ids.filter((id) => id in progress).length;
