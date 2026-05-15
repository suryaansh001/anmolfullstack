const { z } = require('zod');

const quillDeltaSchema = z.object({
  ops: z.array(
    z.object({
      insert: z.any(),
      attributes: z.record(z.any()).optional()
    })
  )
});

const contentCreateSchema = z.object({
  title: z.string().min(1).max(200),
  genre: z.string().min(1).max(100),
  tags: z.array(z.string().min(1)).max(10).default([]),
  language: z.enum(['hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati', 'punjabi', 'english']),
  contentType: z.enum(['lyrics', 'story', 'poem', 'screenplay']),
  quillDelta: quillDeltaSchema
});

const contentUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  genre: z.string().min(1).max(100).optional(),
  tags: z.array(z.string().min(1)).max(10).optional(),
  language: z.enum(['hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati', 'punjabi', 'english']).optional(),
  contentType: z.enum(['lyrics', 'story', 'poem', 'screenplay']).optional(),
  quillDelta: quillDeltaSchema.optional()
});

const autosaveSchema = z.object({
  delta: quillDeltaSchema
});

const versionSchema = z.object({
  delta: quillDeltaSchema.optional()
});

const ratingSchema = z.object({
  score: z.number().int().min(1).max(5)
});

const searchQuerySchema = z.object({
  q: z.string().min(1),
  language: z.string().optional(),
  genre: z.string().optional(),
  cursor: z.string().optional()
});

const languageQuerySchema = z.object({
  lang: z.enum(['hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati', 'punjabi', 'english']),
  sort: z.literal('title').default('title')
});

module.exports = {
  quillDeltaSchema,
  contentCreateSchema,
  contentUpdateSchema,
  autosaveSchema,
  versionSchema,
  ratingSchema,
  searchQuerySchema,
  languageQuerySchema
};
