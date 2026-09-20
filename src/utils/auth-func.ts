import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { optionalAuthMiddleware } from '#/middleware/optional-auth-middleware.ts'

export const getCurrentUser = createServerFn()
  .middleware([optionalAuthMiddleware])
  .handler(async ({ context }) => {
    return context.user
  })

export const currentUserQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: getCurrentUser,
  staleTime: 1000 * 60 * 60, // 1 hour
})
