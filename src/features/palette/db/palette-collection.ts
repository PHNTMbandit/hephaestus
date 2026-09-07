import { QueryClient } from '@tanstack/query-core'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { BasicIndex, collectionOptions } from '@tanstack/react-db'
import { z } from 'zod'
import { paletteVisibilities } from '../schema/palette-save-schema'
import { getPalettes, publishPalette, updatePalette, deletePalette } from '../utils'

import type { Color } from '#/features/color/color.types.ts'

const paletteSchema = z.object({
  baseColor: z.string(),
  colors: z.custom<Color[]>(),
  createdAt: z.string().default(() => new Date().toISOString()),
  description: z.string().default(''),
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string(),
  updatedAt: z.string().default(() => new Date().toISOString()),
  userId: z.string().default(''),
  visibility: z.enum(paletteVisibilities).default('private'),
})

export type Palette = z.infer<typeof paletteSchema>

export const paletteCollection = collectionOptions('palettes', (client) =>
  queryCollectionOptions({
    id: 'palettes',
    schema: paletteSchema,
    queryKey: ['getPalettes'],
    queryFn: () => getPalettes(),
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    getKey: (palette) => palette.id,
    autoIndex: 'eager',
    defaultIndexType: BasicIndex,
    onInsert: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((m) =>
          publishPalette({
            data: {
              id: m.modified.id,
              name: m.modified.name,
              description: m.modified.description,
              visibility: m.modified.visibility,
              baseColor: m.modified.baseColor,
              colors: m.modified.colors,
            },
          }),
        ),
      )
    },
    onUpdate: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((m) =>
          updatePalette({
            data: {
              id: m.modified.id,
              userId: m.modified.userId,
              baseColor: m.modified.baseColor,
              colors: m.modified.colors,
            },
          }),
        ),
      )
    },
    onDelete: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((m) =>
          deletePalette({ data: { id: m.original.id, userId: m.original.userId } }),
        ),
      )
    },
  }),
)
