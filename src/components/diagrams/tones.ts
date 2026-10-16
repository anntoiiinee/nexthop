// Palette commune des schémas. Classes Tailwind écrites en entier (jamais construites dynamiquement).
export type Tone = 'slate' | 'sky' | 'emerald' | 'amber' | 'violet' | 'rose';

/** Blocs HTML (cases de trame, segments, encarts) */
export const boxTone: Record<Tone, { box: string; text: string; chip: string }> = {
  slate: {
    box: 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900',
    text: 'text-slate-700 dark:text-slate-300',
    chip: 'bg-slate-300 dark:bg-slate-600',
  },
  sky: {
    box: 'border-sky-300 bg-sky-50 dark:border-sky-500/40 dark:bg-sky-500/10',
    text: 'text-sky-700 dark:text-sky-300',
    chip: 'bg-sky-400 dark:bg-sky-500',
  },
  emerald: {
    box: 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10',
    text: 'text-emerald-700 dark:text-emerald-300',
    chip: 'bg-emerald-400 dark:bg-emerald-500',
  },
  amber: {
    box: 'border-amber-300 bg-amber-50 dark:border-amber-500/40 dark:bg-amber-500/10',
    text: 'text-amber-700 dark:text-amber-300',
    chip: 'bg-amber-400 dark:bg-amber-500',
  },
  violet: {
    box: 'border-violet-300 bg-violet-50 dark:border-violet-500/40 dark:bg-violet-500/10',
    text: 'text-violet-700 dark:text-violet-300',
    chip: 'bg-violet-400 dark:bg-violet-500',
  },
  rose: {
    box: 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10',
    text: 'text-rose-700 dark:text-rose-300',
    chip: 'bg-rose-400 dark:bg-rose-500',
  },
};

/** Éléments SVG (icônes, liens, zones) */
export const svgTone: Record<Tone, { stroke: string; fill: string; soft: string; text: string }> = {
  slate: {
    stroke: 'stroke-slate-400 dark:stroke-slate-500',
    fill: 'fill-slate-400 dark:fill-slate-500',
    soft: 'fill-slate-50 dark:fill-slate-800/40',
    text: 'fill-slate-500 dark:fill-slate-400',
  },
  sky: {
    stroke: 'stroke-sky-500',
    fill: 'fill-sky-500',
    soft: 'fill-sky-50 dark:fill-sky-500/10',
    text: 'fill-sky-700 dark:fill-sky-300',
  },
  emerald: {
    stroke: 'stroke-emerald-500',
    fill: 'fill-emerald-500',
    soft: 'fill-emerald-50 dark:fill-emerald-500/10',
    text: 'fill-emerald-700 dark:fill-emerald-300',
  },
  amber: {
    stroke: 'stroke-amber-500',
    fill: 'fill-amber-500',
    soft: 'fill-amber-50 dark:fill-amber-500/10',
    text: 'fill-amber-700 dark:fill-amber-300',
  },
  violet: {
    stroke: 'stroke-violet-500',
    fill: 'fill-violet-500',
    soft: 'fill-violet-50 dark:fill-violet-500/10',
    text: 'fill-violet-700 dark:fill-violet-300',
  },
  rose: {
    stroke: 'stroke-rose-500',
    fill: 'fill-rose-500',
    soft: 'fill-rose-50 dark:fill-rose-500/10',
    text: 'fill-rose-700 dark:fill-rose-300',
  },
};
