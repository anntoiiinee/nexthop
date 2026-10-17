// Images Open Graph (1200×630) générées au build, une par tutoriel, chapitre, formation et outil.
// Satori dessine la mise en page en SVG (texte converti en tracés, donc sans dépendre des polices
// installées sur la machine de build), puis sharp la convertit en PNG.
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { t, type Lang } from '@/i18n/ui';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const CONTENT_WIDTH = OG_WIDTH - 2 * 72; // largeur utile, indispensable à Satori pour les retours à la ligne

const font = (pkg: string, file: string) => fs.readFileSync(path.join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));

let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
const loadFonts = () => (fonts ??= [
  { name: 'Inter', data: font('inter', 'inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-ext-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-700-normal.woff'), weight: 700, style: 'normal' },
  { name: 'Inter', data: font('inter', 'inter-latin-ext-700-normal.woff'), weight: 700, style: 'normal' },
  { name: 'Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff'), weight: 600, style: 'normal' },
]);

let icon: string | undefined;
const logo = () => (icon ??= `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), 'public', 'icon-192.png')).toString('base64')}`);

export interface OgContent {
  lang: Lang;
  kicker: string;                 // petite ligne au-dessus du titre (type de contenu, formation…)
  title: string;
  description: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

const LEVEL_COLORS = {
  beginner: { bg: '#064e3b', fg: '#6ee7b7' },
  intermediate: { bg: '#78350f', fg: '#fcd34d' },
  advanced: { bg: '#881337', fg: '#fda4af' },
};

// Petit équivalent de JSX pour Satori : { type, props: { style, children } }
type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): El =>
  ({ type, props: { style, children, ...extra } });

export async function renderOgImage(c: OgContent): Promise<Buffer> {
  const titleSize = c.title.length > 70 ? 52 : c.title.length > 45 ? 60 : 68;

  // Fond sur toute l'image, contenu dans un cadre de dimensions exactes (une marge intérieure sur un bloc
  // à 100 % l'agrandirait au-delà de l'image et repousserait le pied hors du cadre)
  const tree = h('div', {
    width: OG_WIDTH, height: OG_HEIGHT, display: 'flex', backgroundColor: '#020617', color: '#ffffff', fontFamily: 'Inter',
    backgroundImage: 'radial-gradient(circle at 12% 0%, rgba(14,165,233,0.28), rgba(2,6,23,0) 55%)',
  }, h('div', {
    width: CONTENT_WIDTH, height: OG_HEIGHT - 2 * 60, margin: '60px 72px',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  }, [
    // En-tête : logo + nom du site
    h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
      h('img', { width: 64, height: 64, borderRadius: 14 }, undefined, { src: logo(), width: 64, height: 64 }),
      h('div', { display: 'flex', fontSize: 40, fontWeight: 700 }, [
        h('span', { color: '#ffffff' }, 'next'),
        h('span', { color: '#0ea5e9' }, 'hop'),
      ]),
    ]),

    // Corps : type de contenu, titre, description
    h('div', { display: 'flex', flexDirection: 'column', gap: 18, width: CONTENT_WIDTH }, [
      h('div', { fontFamily: 'Mono', fontSize: 24, fontWeight: 600, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 1 }, c.kicker),
      h('div', { width: CONTENT_WIDTH, fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, lineClamp: 3, display: 'block' }, c.title),
      h('div', { width: CONTENT_WIDTH, fontSize: 28, color: '#94a3b8', lineHeight: 1.35, lineClamp: 2, display: 'block' }, c.description),
    ]),

    // Pied : niveau, tags, domaine
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: CONTENT_WIDTH }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        ...(c.level ? [h('div', {
          display: 'flex', padding: '6px 18px', borderRadius: 999, fontSize: 22, fontWeight: 600,
          backgroundColor: LEVEL_COLORS[c.level].bg, color: LEVEL_COLORS[c.level].fg,
        }, t(c.lang, `level.${c.level}`))] : []),
        h('div', { display: 'flex', gap: 14, fontFamily: 'Mono', fontSize: 22, color: '#64748b' },
          (c.tags ?? []).slice(0, 4).map((tag) => h('span', {}, `#${tag}`))),
      ]),
      h('div', { fontFamily: 'Mono', fontSize: 22, color: '#64748b' }, 'nexthop.alcpt.network'),
    ]),
  ]));

  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
