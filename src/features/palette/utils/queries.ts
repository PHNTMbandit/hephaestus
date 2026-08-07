import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '#/db/index.ts'
import { colorPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

import type { Color } from '#/features/color/color.types.ts'

export const savePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; name: string; colors: Color[]; baseColor: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, name, colors, baseColor }, context }) => {
    const [response] = await db
      .insert(colorPalettes)
      .values({ id, name, userId: context.user.id, baseColor, colors })
      .returning()
    return response
  })

export const updatePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; colors: Color[]; baseColor: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, colors, baseColor } }) => {
    try {
      await db
        .update(colorPalettes)
        .set({
          colors: colors,
          baseColor: baseColor,
        })
        .where(eq(colorPalettes.id, id))
    } catch (error) {
      console.error('Error updating palette:', error)
      throw new Error('Failed to update palette', { cause: error })
    }
  })

export const deletePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id } }) => {
    try {
      await db.delete(colorPalettes).where(eq(colorPalettes.id, id))
    } catch (error) {
      console.error('Error deleting palette:', error)
      throw new Error('Failed to delete palette', { cause: error })
    }
  })

const getPalette = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id } }) => {
    const [response] = await db
      .select()
      .from(colorPalettes)
      .where(eq(colorPalettes.id, id))
      .limit(1)

    if (!response) throw new Error('Palette not found')
    return response
  })

export const getPalettes = createServerFn({ method: 'GET' }).handler(async () => {
  return db.select().from(colorPalettes)
})

export const paletteQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getPalette', id],
    queryFn: () => getPalette({ data: { id } }),
  })

export const palettesQueryOptions = queryOptions({
  queryKey: ['getPalettes'],
  queryFn: getPalettes,
})
