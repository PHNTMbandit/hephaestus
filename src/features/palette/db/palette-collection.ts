import { QueryClient } from '@tanstack/query-core'
import { parseLoadSubsetOptions, queryCollectionOptions } from '@tanstack/query-db-collection'
import { BasicIndex, collectionOptions } from '@tanstack/react-db'
import { z } from 'zod'
import { paletteVisibilities } from '../schema/palette-save-schema'
import { publishPalette, updatePalette, deletePalette, getPalettesSubset } from '../utils'

import type { Color } from '#/features/color/color.types.ts'
import type { LoadSubsetOptions } from '@tanstack/db'

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

type ParsedSubset = {
  filters: Array<{ field: Array<string | number>; operator: string; value?: unknown }>
  sorts: Array<{ field: Array<string | number>; direction: 'asc' | 'desc' }>
  limit?: number
  offset?: number
  supported: boolean
}

const parseSubset = (options: LoadSubsetOptions | undefined | null): ParsedSubset => {
  const offset = options?.offset
  try {
    const { filters, sorts, limit } = parseLoadSubsetOptions(options)
    return { filters, sorts, limit, offset, supported: true }
  } catch {
    return { filters: [], sorts: [], limit: options?.limit, offset, supported: false }
  }
}

export const paletteCollection = collectionOptions('palettes', (client) =>
  queryCollectionOptions({
    id: 'palettes',
    autoIndex: 'eager',
    defaultIndexType: BasicIndex,
    getKey: (palette) => palette.id,
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    syncMode: 'on-demand',
    queryKey: (opts) => {
      const { filters, sorts, limit, offset, supported } = parseSubset(opts)
      const key: Array<unknown> = ['paletteCollection']
      if (filters.length > 0) key.push({ filters })
      if (sorts.length > 0) key.push({ sorts })
      if (limit !== undefined) key.push({ limit })
      if (offset !== undefined) key.push({ offset })
      if (!supported) key.push({ unsupported: String(opts.where) })
      return key
    },
    queryFn: (ctx) => {
      const { filters, sorts, limit, offset, supported } = parseSubset(ctx.meta?.loadSubsetOptions)
      if (!supported) return []
      return getPalettesSubset({
        data: {
          filters: filters.map((filter) => ({
            field: filter.field.map(String),
            operator: filter.operator,
            value: filter.value,
          })),
          sorts: sorts.map((sort) => ({
            field: sort.field.map(String),
            direction: sort.direction,
          })),
          limit,
          offset,
        },
      })
    },
    schema: paletteSchema,
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
