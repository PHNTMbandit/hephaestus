import { FigmaLogoIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"

type FigmaButtonProps = React.ComponentProps<typeof Button>

export const FigmaButton = ({
	className,
	children,
	ref,
	...props
}: FigmaButtonProps) => {
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
			<FigmaLogoIcon weight="bold" />
		</Button>
	)
}
