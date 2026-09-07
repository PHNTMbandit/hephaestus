import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { getDb } from '#/db/rls.ts'
import { colorPalettes } from '#/db/schema.ts'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

import type { Color } from '#/features/color/color.types.ts'

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

      const updated = await getDb(context.user.id, (tx) =>
        tx
          .update(colorPalettes)
          .set({ colors, baseColor })
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
