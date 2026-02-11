import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "suwa-ui"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<div className="flex h-full w-full items-center justify-center gap-xs">
			<Link to="/sign-in">
				<Button style="ghost">Sign Up</Button>
			</Link>

			<Link to="/sign-in">
				<Button>Sign In</Button>
			</Link>
		</div>
	)
}
