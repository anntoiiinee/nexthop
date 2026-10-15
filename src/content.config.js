import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const levels = z.enum(['beginner', 'intermediate', 'advanced']);

const base = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  level: levels,
  tags: z.array(z.string()).default([]),
  vendor: z.array(z.enum(['arista', 'cisco', 'fortinet', 'paloalto', 'stormshield', 'infoblox', 'netbox', 'multi'])).default([]),
  prerequisites: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: base,
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
  schema: base.extend({
    order: z.number().default(0), // 0 = course landing page, then 1, 2, 3…
  }),
});

export const collections = { tutorials, courses };