import { collectionOptions } from '@tanstack/db'
import { QueryClient } from '@tanstack/query-core'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import z from 'zod'
import { addLike, getAllPaletteSaves, removeLike } from '../utils'

const savesSchema = z.object({
  id: z.string(),
  userId: z.string().default(''),
  colorPaletteId: z.string().default(() => crypto.randomUUID()),
  createdAt: z.string().default(() => new Date().toISOString()),
})

export type Save = z.infer<typeof savesSchema>

export const paletteSavesCollection = collectionOptions('paletteSaves', (client) =>
  queryCollectionOptions({
    schema: savesSchema,
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    queryKey: ['paletteSaves'],
    queryFn: async () => getAllPaletteSaves(),
    getKey: (save) => save.id,
    onInsert: async ({ transaction }) =>
      await Promise.all(
        transaction.mutations.map((m) =>
          addLike({
            data: {
              paletteId: m.modified.colorPaletteId,
            },
          }),
        ),
      ),
    onDelete: async ({ transaction }) =>
      await Promise.all(
        transaction.mutations.map((m) =>
          removeLike({
            data: {
              paletteId: m.original.colorPaletteId,
            },
          }),
        ),
      ),
  }),
)
