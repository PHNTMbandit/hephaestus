import { TranslateIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"
import { getLocale, setLocale } from "@/paraglide/runtime"

type LanguageToggleProps = React.ComponentProps<typeof Button>

export const LanguageToggle = ({
	className,
	children,
	ref,
	...props
}: LanguageToggleProps) => {
	const handleClick = () => {
		setLocale(getLocale() === "en" ? "ja" : "en")
	}

	return (
		<Button
			className={cn("", className)}
			onClick={handleClick}
			ref={ref}
			size={"iconMedium"}
			style="ghost"
			tone={"neutral"}
			{...props}
		>
			{children}
			<TranslateIcon weight="bold" />
			{getLocale().toUpperCase()}
		</Button>
	)
}
