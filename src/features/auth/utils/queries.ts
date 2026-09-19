import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { getDb } from '#/db/rls'
import { userPublic } from '#/db/schema'
import { optionalAuthMiddleware } from '#/middleware/optional-auth-middleware'

export const getUser = createServerFn()
  .validator((data: { userId: string }) => data)
  .middleware([optionalAuthMiddleware])
  .handler(async ({ context: { userId: currentUserId }, data: { userId } }) => {
    const [data] = await getDb(currentUserId, (tx) =>
      tx.select().from(userPublic).where(eq(userPublic.id, userId)).limit(1),
    )
    return data
  })

export const userQueryOptions = (userId: string | undefined) =>
  queryOptions({
    queryKey: ['user', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required')
      }

      return getUser({ data: { userId } })
    },
    enabled: !!userId,
  })
