import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider } from 'dawn-ui-react'
import { ClientSidebar } from '#/components/client-sidebar'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider id={'main'}>
      <ClientSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
