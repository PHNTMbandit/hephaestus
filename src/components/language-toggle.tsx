import { TranslateIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"

type LanguageToggleProps = React.ComponentProps<typeof Button>

export const LanguageToggle = ({
	className,
	children,
	ref,
	...props
}: LanguageToggleProps) => {
	return (
		<Button
			className={cn("", className)}
			ref={ref}
			size={"iconMedium"}
			style="ghost"
			tone={"neutral"}
			{...props}
		>
			{children}
			<TranslateIcon weight="bold" />
		</Button>
	)
}
