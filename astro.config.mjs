// @ts-check
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Tutoriels « en cours de rédaction » (wip: true) : visibles, mais exclus du sitemap
const wipTutorialPaths = ['fr', 'en'].flatMap((lang) => {
  const dir = `./src/content/tutorials/${lang}`;
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /^wip:\s*true\s*$/m.test(fs.readFileSync(`${dir}/${f}`, 'utf-8')))
    .map((f) => `${lang === 'fr' ? '/tutoriels' : '/en/tutorials'}/${f.replace(/\.mdx?$/, '')}/`);
});

export default defineConfig({
  site: 'https://nexthop.alcpt.network',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    expressiveCode(), // options dans ec.config.mjs
    mdx(),
    sitemap({
      filter: (page) => !wipTutorialPaths.some((path) => page.endsWith(path)),
      i18n: {
        defaultLocale: 'fr',
        locales: {fr: 'fr-FR', en: 'en-US'},
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});