import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { currentUserQueryOptions } from '#/utils/auth-func.ts'

export const Route = createFileRoute('/_app/_secure')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.query(currentUserQueryOptions)
    return {
      user,
    }
  },
  loader: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' })
    }
    return context.user
  },
})

function RouteComponent() {
  return <Outlet />
}
