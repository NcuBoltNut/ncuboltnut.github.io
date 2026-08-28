import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    linkText: z.string().optional(),
    linkHref: z.string().optional(),
    order: z.number(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    dateLabel: z.string(),
    photos: z.array(z.string()).min(1),
    summary: z.string(),
    stats: z
      .array(
        z.object({
          num: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    linkText: z.string().optional(),
    linkHref: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { news, activities };
