import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"
import { SignUpForm } from "@/features/auth/components/sign-up-form"
import { getFormDataFromServer } from "@/lib/form"

export const Route = createFileRoute("/sign-up")({
	component: RouteComponent,
	loader: async () => ({
		state: await getFormDataFromServer(),
	}),
})

function RouteComponent() {
	const { state } = Route.useLoaderData()

	return (
		<div className="flex h-full w-1/3 flex-col items-center justify-center space-y-lg">
			<Suspense fallback={<div>Loading...</div>}>
				<SignUpForm state={state} />
				<p>
					Already have an account?{" "}
					<Link to="/sign-in" className="text-primary hover:underline">
						Sign In
					</Link>
				</p>
			</Suspense>
		</div>
	)
}
