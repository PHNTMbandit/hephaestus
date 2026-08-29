import { QueryClient } from '@tanstack/query-core'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { collectionOptions } from '@tanstack/react-db'
import { z } from 'zod'
import {
  getPalettes,
  palettesQueryOptions,
  savePalette,
  updatePalette,
  deletePalette,
} from '../utils'

import type { Color } from '#/features/color/color.types.ts'

const paletteSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  userId: z.string().default(''),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
  name: z.string(),
  baseColor: z.string(),
  colors: z.custom<Color[]>(),
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
