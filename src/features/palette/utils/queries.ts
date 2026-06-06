import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { db } from '#/db/index.ts'
import { colourPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'
import { paletteGeneratorMethods } from './generator-methods'

import type { Colour } from '#/features/colour/colour.types.ts'

export const initializePaletteState = createServerFn()
  .inputValidator((data: { baseColour: string }) => data)
  .handler(({ data: { baseColour } }): Colour[] => {
    return paletteGeneratorMethods.monochromatic.generatePalette(baseColour, 5)
  })

export const initialisePaletteStateQueryOptions = (baseColour: string) =>
  queryOptions({
    queryKey: ['initialPaletteState', baseColour],
    queryFn: () => initializePaletteState({ data: { baseColour } }),
  })

export const savePalette = createServerFn({ method: 'POST' })
  .inputValidator((data: { name: string; palette: Colour[] }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { name, palette }, context }) => {
    try {
      const [response] = await db
        .insert(colourPalettes)
        .values({
          name: name,
          userId: context.user.id,
          dataJson: palette,
        })
        .returning({
          id: colourPalettes.id,
        })

      return response
    } catch (error) {
      throw new Error('Failed to save palette', { cause: error })
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
        id: response.id,
        name: response.name,
      }
    } catch {
      return null
    }
  })

const getPalettes = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const response = await db.select().from(colourPalettes)
    return response.map((palette) => ({
      id: palette.id,
      name: palette.name,
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
