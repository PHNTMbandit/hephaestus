import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '#/db/index.ts'
import { colourPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

import type { Colour } from '#/features/colour/colour.types.ts'

export const savePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; name: string; colours: Colour[]; baseColour: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, name, colours, baseColour }, context }) => {
    const [response] = await db
      .insert(colourPalettes)
      .values({ id, name, userId: context.user.id, baseColour, colours })
      .returning()
    return response
  })

export const updatePalette = createServerFn({ method: 'POST' })
  .validator((data: { id: string; colours: Colour[]; baseColour: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id, colours, baseColour } }) => {
    try {
      await db
        .update(colourPalettes)
        .set({
          colours: colours,
          baseColour: baseColour,
        })
        .where(eq(colourPalettes.id, id))
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
      await db.delete(colourPalettes).where(eq(colourPalettes.id, id))
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
      .from(colourPalettes)
      .where(eq(colourPalettes.id, id))
      .limit(1)

    if (!response) throw new Error('Palette not found')
    return response
  })

export const getPalettes = createServerFn({ method: 'GET' }).handler(async () => {
  return db.select().from(colourPalettes)
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
