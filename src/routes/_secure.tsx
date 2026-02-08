import { createFileRoute, Outlet } from "@tanstack/react-router"
import { SidebarProvider, SidebarToggle } from "suwa-ui"
import { ClientSidebar } from "@/features/client-sidebar/components/client-sidebar"
import { authMiddleware } from "@/middleware/auth-middleware"

export const Route = createFileRoute("/_secure")({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
})

function RouteComponent() {
	return (
		<SidebarProvider collapsible="icon">
			<ClientSidebar />
			<SidebarToggle />
			<Outlet />
		</SidebarProvider>
	)
}
