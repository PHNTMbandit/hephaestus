import { createFileRoute } from "@tanstack/react-router"
import { Button, Slider, ThemeToggle } from "suwa-ui"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<div className="h-screen w-full">
			<ThemeToggle size={"iconMedium"} />
			<Button>Click me</Button>
			<Button tone="error">Click me</Button>
			<Slider />
		</div>
	)
}
