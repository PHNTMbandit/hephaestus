import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection } from '@tanstack/react-db'
import { z } from 'zod'
import {
  getPalettes,
  palettesQueryOptions,
  savePalette,
  updatePalette,
  deletePalette,
} from '../utils'

import type { Colour } from '#/features/colour/colour.types.ts'
import type { QueryClient } from '@tanstack/query-core'

const paletteSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  userId: z.string().default(''),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
  name: z.string(),
  baseColour: z.string(),
  colours: z.custom<Colour[]>(),
})

export const paletteCollection = (queryClient: QueryClient) =>
  createCollection(
    queryCollectionOptions({
      schema: paletteSchema,
      queryKey: palettesQueryOptions.queryKey,
      queryFn: () => getPalettes(),
      queryClient,
      getKey: (palette) => palette.id,
      onInsert: async ({ transaction }) => {
        await Promise.all(
          transaction.mutations.map((m) =>
            savePalette({
              data: {
                id: m.modified.id,
                name: m.modified.name,
                baseColour: m.modified.baseColour,
                colours: m.modified.colours,
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
                baseColour: m.modified.baseColour,
                colours: m.modified.colours,
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
