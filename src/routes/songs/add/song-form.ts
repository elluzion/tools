import { z } from 'zod';

const base = z.object({
  id: z.number().default(0),
  artUrl: z.string().url(),
});

const firstLine = z.object({
  title: z.string().max(100),
  artists: z.array(z.string().max(100)),
});

const metadata = z.object({
  permalink: z.string().max(20),
  tempo: z.optional(z.coerce.number().min(50).max(200).multipleOf(0.01)),
  key: z.optional(z.string().max(15)),
  genre: z.string().max(30),
  label: z.optional(z.string().max(25)),
  releaseDate: z.coerce.date(),
  type: z.string().max(15),
});

const links = z.object({
  streamLinks: z.array(z.string().url()).default([]),
  downloadLinks: z
    .array(
      z.object({
        url: z.string().url(),
        edit: z.string(),
        format: z.enum(['mp3', 'wav']),
      }),
    )
    .default([]),
});

/**
 * In sync with {@link Song}
 */
export const songFormSchema = base.merge(firstLine).merge(metadata).merge(links);

/**
 * The inferred type of {@link songFormSchema}.
 */
export type SongFormSchema = z.infer<typeof songFormSchema>;
