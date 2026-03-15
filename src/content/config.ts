import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    logoImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).nonempty(),
    category: z.enum(['cloud', 'web', 'mobile', 'data', 'other']),
    featured: z.boolean(),
    startDate: z.string(),
    endDate: z.string().optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    imageUrl: z.string().optional(),
  }),
});

export const collections = { blog, projects };
