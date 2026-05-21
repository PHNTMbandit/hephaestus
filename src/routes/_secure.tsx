import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarProvider } from 'dawn-ui-react'
import { ClientSidebar } from '#/components/client-sidebar.tsx'
import { userQueryOptions } from '#/utils/auth-func.ts'

export const Route = createFileRoute('/_secure')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = context.queryClient.ensureQueryData(userQueryOptions)
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
  const data = Route.useLoaderData()

  return (
    <SidebarProvider>
      <ClientSidebar user={data} />
      <Outlet />
    </SidebarProvider>
  )
}
