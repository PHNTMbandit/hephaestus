import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '#/middleware/auth-middleware.ts'

export const getCurrentUser = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context.user
  })

export const currentUserQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: getCurrentUser,
  staleTime: 1000 * 60 * 60, // 1 hour
})
