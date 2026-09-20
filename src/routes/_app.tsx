import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider } from 'dawn-ui-react'
import { ClientSidebar } from '#/components/client-sidebar'
import { currentUserQueryOptions } from '#/utils/auth-func'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.query(currentUserQueryOptions)
  },
})

function RouteComponent() {
  return (
    <SidebarProvider id={'main'}>
      <ClientSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
