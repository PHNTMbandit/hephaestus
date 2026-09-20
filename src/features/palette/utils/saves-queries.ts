import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { getDb } from '#/db/rls'
import { colorPaletteSaves } from '#/db/schema'
import { authMiddleware } from '#/middleware/auth-middleware'
import { optionalAuthMiddleware } from '#/middleware/optional-auth-middleware'

export const getAllPaletteSaves = createServerFn({ method: 'GET' })
  .middleware([optionalAuthMiddleware])
  .handler(async ({ context: { userId } }) => {
    return getDb(userId, (tx) => tx.select().from(colorPaletteSaves))
  })

export const addLike = createServerFn({ method: 'POST' })
  .validator((data: { paletteId: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { paletteId }, context }) => {
    try {
      await getDb(context.user.id, (tx) =>
        tx
          .insert(colorPaletteSaves)
          .values({
            colorPaletteId: paletteId,
            userId: context.user.id,
          })
          .onConflictDoNothing(),
      )
    } catch (error) {
      throw new Error('Failed to add like', { cause: error })
    }
  })

export const removeLike = createServerFn({ method: 'POST' })
  .validator((data: { paletteId: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data: { paletteId }, context }) => {
    try {
      await getDb(context.user.id, (tx) =>
        tx
          .delete(colorPaletteSaves)
          .where(
            and(
              eq(colorPaletteSaves.colorPaletteId, paletteId),
              eq(colorPaletteSaves.userId, context.user.id),
            ),
          ),
      )
    } catch (error) {
      throw new Error('Failed to remove like', { cause: error })
    }
  })
