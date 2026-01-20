import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "suwa-ui"
import { componentDocs } from "@/features/docs/data/component-docs"

export const Route = createFileRoute("/docs/components/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			{componentDocs.map((doc) => (
				<Link
					key={doc.name}
					params={{ componentName: doc.name }}
					to="/docs/components/$componentName"
				>
					<Button>{doc.name}</Button>
				</Link>
			))}
		</div>
	)
}
