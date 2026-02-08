import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_secure/projects")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_secure/projects"!</div>
}
