import { createMiddleware } from '@tanstack/react-start'
import { auth } from '#/lib/auth.ts'

export const optionalAuthMiddleware = createMiddleware().server(async ({ next, request }) => {
  const session = await auth.api.getSession({ headers: request.headers })

  return await next({
    context: {
      session: session?.session ?? null,
      user: session?.user ?? null,
      userId: session?.user.id ?? '',
    },
  })
})
