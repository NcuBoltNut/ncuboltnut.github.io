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

const achievements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.object({
    // Which section of the achievements page this record renders in —
    // each category maps to a distinct hand-built layout block, since the
    // page shows four visually different kinds of record rather than one
    // uniform list (see achievements.astro).
    category: z.enum(['competition', 'robot', 'academic', 'milestone']),
    title: z.string(),
    subtitle: z.string().optional(), // competition's eyebrow / robot's robot-sub
    date: z.string().optional(), // competition only — free-text date pill, e.g. "2025年12月6日"
    rank: z.string().optional(), // academic only — the rank/award badge text
    tags: z.array(z.string()).optional(), // robot only
    body: z.string().optional(), // may contain simple HTML (e.g. <strong>)
    photo: z.string().optional(), // robot/academic only
    photoStyle: z.string().optional(), // optional inline object-position override
    // order is scoped within a category, not global — each category
    // renders as its own section, so "first" only needs to mean first
    // within that section.
    order: z.number(),
  }),
});

export const collections = { news, activities, achievements };
