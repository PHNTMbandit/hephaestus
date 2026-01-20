import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/hooks/theme-provider"
import { getThemeServerFn } from "@/lib/theme"
import appCss from "../styles.css?url"

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	loader: () => getThemeServerFn(),
})

function RootDocument({ children }: { children: React.ReactNode }) {
	const theme = Route.useLoaderData()

	return (
		<html className={theme} lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="flex h-screen flex-col items-center justify-start">
				<ThemeProvider theme={theme}>
					<Header />
					{children}
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
