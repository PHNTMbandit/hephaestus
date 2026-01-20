import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Button, cn } from "suwa-ui"

type DownloadButtonProps = React.ComponentProps<typeof Button>

export const DownloadButton = ({
	className,
	children,
	ref,
	...props
}: DownloadButtonProps) => {
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
			<DownloadSimpleIcon weight="bold" />
		</Button>
	)
}
