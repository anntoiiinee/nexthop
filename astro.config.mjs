// @ts-check
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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