import { QueryClient } from '@tanstack/query-core'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { collectionOptions } from '@tanstack/react-db'
import { z } from 'zod'
import { paletteVisibilities } from '../schema/palette-save-schema'
import {
  getPalettes,
  palettesQueryOptions,
  savePalette,
  updatePalette,
  deletePalette,
} from '../utils'

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

export const paletteCollection = collectionOptions('palettes', (client) =>
  queryCollectionOptions({
    schema: paletteSchema,
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    queryKey: palettesQueryOptions.queryKey,
    queryFn: () => getPalettes(),
    getKey: (palette) => palette.id,
    onInsert: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((m) =>
          savePalette({
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
              baseColor: m.modified.baseColor,
              colors: m.modified.colors,
            },
          }),
        ),
      )
    },
    onDelete: async ({ transaction }) => {
      await Promise.all(
        transaction.mutations.map((m) => deletePalette({ data: { id: m.original.id } })),
      )
    },
  }),
)
