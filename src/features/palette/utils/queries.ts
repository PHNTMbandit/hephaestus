import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '#/db/index.ts'
import { colourPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

import type { Colour } from '#/features/colour/colour.types.ts'

export const savePalette = createServerFn({ method: 'POST' })
  .inputValidator((data: { name: string; colours: Colour[]; baseColour: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { name, colours, baseColour }, context }) => {
    try {
      const [response] = await db
        .insert(colourPalettes)
        .values({
          name: name,
          userId: context.user.id,
          baseColour: baseColour,
          colours: colours,
        })
        .returning({
          id: colourPalettes.id,
          name: colourPalettes.name,
          baseColour: colourPalettes.baseColour,
          colours: colourPalettes.colours,
          createdAt: colourPalettes.createdAt,
          updatedAt: colourPalettes.updatedAt,
          userId: colourPalettes.userId,
        })

      return response
    } catch (error) {
      console.error('Error saving palette:', error)
      throw new Error('Failed to save palette', { cause: error })
    }
  })

export const updatePalette = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string; colours: Colour[]; baseColour: string }) => data)
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

const getPalette = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { id } }) => {
    try {
      const [response] = await db
        .select()
        .from(colourPalettes)
        .where(eq(colourPalettes.id, id))
        .limit(1)

      return {
        baseColour: response.baseColour,
        colours: response.colours,
        createdAt: response.createdAt,
        id: response.id,
        name: response.name,
        updatedAt: response.updatedAt,
        userId: response.userId,
      }
    } catch {
      return null
    }
  })

const getPalettes = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const response = await db.select().from(colourPalettes)
    return response.map((palette) => ({
      baseColour: palette.baseColour,
      colours: palette.colours,
      createdAt: palette.createdAt,
      id: palette.id,
      name: palette.name,
      updatedAt: palette.updatedAt,
      userId: palette.userId,
    }))
  } catch {
    return null
  }
})

export const getPaletteQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['getPalette', id],
    queryFn: () => getPalette({ data: { id } }),
  })

export const getPalettesQueryOptions = queryOptions({
  queryKey: ['getPalettes'],
  queryFn: getPalettes,
})
