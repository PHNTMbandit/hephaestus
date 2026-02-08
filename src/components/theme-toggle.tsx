import { MoonIcon } from "@phosphor-icons/react"
import { SunIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"
import { useTheme } from "@/hooks/theme-provider"

type ThemeToggleProps = React.ComponentProps<typeof Button>

export const ThemeToggle = ({
	className,
	children,
	ref,
	...props
}: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme()

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<Button
			aria-label="Toggle theme"
			className={cn("", className)}
			onClick={toggleTheme}
			ref={ref}
			size={"iconMedium"}
			style="ghost"
			tone={"neutral"}
			{...props}
		>
			{children}
			{theme === "dark" ? (
				<MoonIcon weight="bold" />
			) : (
				<SunIcon weight="bold" />
			)}
		</Button>
	)
}
