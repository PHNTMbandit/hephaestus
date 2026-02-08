import { createFileRoute, Link, redirect } from "@tanstack/react-router"
import { Suspense } from "react"
import { SignInForm } from "@/features/auth/components/sign-in-form"
import { getFormDataFromServer } from "@/lib/form"
import { sessionMiddleware } from "@/middleware/session-middleware"

export const Route = createFileRoute("/sign-in")({
	component: RouteComponent,
	server: {
		middleware: [sessionMiddleware],
	},
	beforeLoad: async ({ serverContext }) => {
		if (serverContext?.session) {
			throw redirect({ to: "/dashboard" })
		}
	},
	loader: async () => ({
		state: await getFormDataFromServer(),
	}),
})

function RouteComponent() {
	const { state } = Route.useLoaderData()

	return (
		<div className="flex h-full w-1/3 flex-col items-center justify-center space-y-lg">
			<Suspense fallback={<div>Loading...</div>}>
				<SignInForm state={state} />
				<p>
					Don't have an account?{" "}
					<Link to="/sign-up" className="text-primary hover:underline">
						Sign Up
					</Link>
				</p>
			</Suspense>
		</div>
	)
}
