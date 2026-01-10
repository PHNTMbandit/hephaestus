import { createFileRoute } from "@tanstack/react-router"
import { authMiddleware } from "@/middleware/auth-middleware"

export const Route = createFileRoute("/_secure")({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
})

function RouteComponent() {
	return <div>Hello "/_secure"!</div>
}
