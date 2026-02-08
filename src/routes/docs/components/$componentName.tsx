import { createFileRoute, redirect } from "@tanstack/react-router"
import { componentDocs } from "@/features/docs/data/component-docs"
import type { ComponentDoc } from "@/features/docs/types/component-doc"

export const Route = createFileRoute("/docs/components/$componentName")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const _component: ComponentDoc | undefined = componentDocs.find(
			(c) => c.name === params.componentName,
		)
		if (!_component) {
			throw redirect({ to: "/" })
		}

		return _component.name
	},
})

function RouteComponent() {
	const componentName = Route.useLoaderData()
	const component: ComponentDoc | undefined = componentDocs.find(
		(c) => c.name === componentName,
	)

	if (!component) {
		throw new Error(`Component "${componentName}" not found`)
	}

	return (
		<div className="flex flex-col">
			<h1>{component.name}</h1>
			<p>{component.description}</p>
			<div className="mt-4">{component.component}</div>
		</div>
	)
}
