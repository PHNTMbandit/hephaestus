import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"

type GithubButtonProps = React.ComponentProps<typeof Button>

export const GithubButton = ({
	className,
	children,
	ref,
	...props
}: GithubButtonProps) => {
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
			<GithubLogoIcon weight="bold" />
		</Button>
	)
}
