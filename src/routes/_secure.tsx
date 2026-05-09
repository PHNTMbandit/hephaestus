import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authMiddleware } from '@/middleware/auth-middleware'

export const Route = createFileRoute('/_secure')({
  component: RouteComponent,
  server: {
    middleware: [authMiddleware],
  },
})

function RouteComponent() {
  return <Outlet />
}
