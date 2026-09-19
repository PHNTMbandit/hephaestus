import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { and, asc, desc, eq, gt, gte, inArray, lt, lte } from 'drizzle-orm'
import { getDb } from '#/db/rls.ts'
import { colorPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

import type { Color } from '#/features/color/color.types.ts'
import type { SQL } from 'drizzle-orm'

export const getPalette = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id }, context }) => {
    const [response] = await getDb(context.user.id, (tx) =>
      tx.select().from(colorPalettes).where(eq(colorPalettes.id, id)).limit(1),
    )

    if (!response) throw new Error('Palette not found')
    return response
  })

export const getPalettes = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return await getDb(context.user.id, (tx) => tx.select().from(colorPalettes))
  })

export const getUserPalettes = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return await getDb(context.user.id, (tx) =>
      tx.select().from(colorPalettes).where(eq(colorPalettes.userId, context.user.id)),
    )
  })

// Columns exposed to on-demand predicate push-down. `colors`/`baseColor` are excluded:
// they are not indexed filter targets and must not be used as query constraints.
const SUBSET_COLUMNS = {
  id: colorPalettes.id,
  userId: colorPalettes.userId,
  visibility: colorPalettes.visibility,
  name: colorPalettes.name,
  createdAt: colorPalettes.createdAt,
  updatedAt: colorPalettes.updatedAt,
} as const

type SubsetColumn = keyof typeof SUBSET_COLUMNS

export type PaletteSubsetFilter = {
  field: string[]
  operator: string
  value: unknown
}

export type PaletteSubsetSort = {
  field: string[]
  direction: 'asc' | 'desc'
}

export type PaletteSubsetInput = {
  filters: PaletteSubsetFilter[]
  sorts: PaletteSubsetSort[]
  limit?: number
  offset?: number
}

const resolveColumn = (field: string[]) =>
  field.length === 1 && field[0] in SUBSET_COLUMNS
    ? SUBSET_COLUMNS[field[0] as SubsetColumn]
    : undefined

const buildCondition = ({ field, operator, value }: PaletteSubsetFilter): SQL | undefined => {
  const column = resolveColumn(field)
  if (!column) return undefined

  switch (operator) {
    case 'eq':
      return eq(column, value as string)
    case 'in':
      return Array.isArray(value) ? inArray(column, value as string[]) : undefined
    case 'gt':
      return gt(column, value as string)
    case 'gte':
      return gte(column, value as string)
    case 'lt':
      return lt(column, value as string)
    case 'lte':
      return lte(column, value as string)
    default:
      return undefined
  }
}

// On-demand subset loader: fetches only the rows a live query asks for so the
// collection scales without materializing every palette client-side.
export const getPalettesSubset = createServerFn({ method: 'POST' })
  .validator((data: PaletteSubsetInput) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { filters, sorts, limit, offset }, context }) => {
    const conditions = filters
      .map(buildCondition)
      .filter((condition): condition is SQL => condition !== undefined)

    const orderBy = sorts
      .map(({ field, direction }) => {
        const column = resolveColumn(field)
        if (!column) return undefined
        return direction === 'desc' ? desc(column) : asc(column)
      })
      .filter((clause): clause is SQL => clause !== undefined)

    return await getDb(context.user.id, (tx) => {
      let query = tx.select().from(colorPalettes).$dynamic()
      if (conditions.length > 0) query = query.where(and(...conditions))
      if (orderBy.length > 0) query = query.orderBy(...orderBy)
      if (limit !== undefined) query = query.limit(limit)
      if (offset !== undefined) query = query.offset(offset)
      return query
    })
  })

export const publishPalette = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      id: string
      name: string
      description: string
      visibility: 'public' | 'unlisted' | 'private'
      colors: Color[]
      baseColor: string
    }) => data,
  )
  .middleware([authMiddleware])
  .handler(async ({ data: { id, name, description, visibility, colors, baseColor }, context }) => {
    const [response] = await getDb(context.user.id, (tx) =>
      tx
        .insert(colorPalettes)
        .values({ id, name, description, visibility, userId: context.user.id, baseColor, colors })
        .returning(),
    )
    return response
  })

export const updatePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; userId: string; colors: Color[]; baseColor: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, userId, colors, baseColor }, context }) => {
    try {
      if (context.user.id !== userId) throw new Error('You can only update your own palettes')
      const updatedAt = new Date().toISOString()

      const updated = await getDb(context.user.id, (tx) =>
        tx
          .update(colorPalettes)
          .set({ colors, baseColor, updatedAt: updatedAt })
          .where(eq(colorPalettes.id, id))
          .returning({ id: colorPalettes.id }),
      )
      if (updated.length === 0) throw new Error('Palette not found or not owned by you')
    } catch (error) {
      throw new Error('Failed to update palette', { cause: error })
    }
  })

export const deletePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; userId: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, userId }, context }) => {
    try {
      if (context.user.id !== userId) throw new Error('You can only delete your own palettes')

      const deleted = await getDb(context.user.id, (tx) =>
        tx
          .delete(colorPalettes)
          .where(eq(colorPalettes.id, id))
          .returning({ id: colorPalettes.id }),
      )
      if (deleted.length === 0) throw new Error('Palette not found or not owned by you')
    } catch (error) {
      throw new Error('Failed to delete palette', { cause: error })
    }
  })

export const palettesQueryOptions = queryOptions({
  queryKey: ['palettes'],
  queryFn: async () => getPalettes(),
  staleTime: 'static',
})

export const paletteQueryOptions = (paletteId: string) =>
  queryOptions({
    queryKey: ['palette', paletteId],
    queryFn: async () => getPalette({ data: { id: paletteId } }),
    staleTime: 'static',
  })
