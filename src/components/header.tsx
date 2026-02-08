import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
import type * as React from "react"
import { Badge, cn, Input, Profile } from "suwa-ui"
import { DownloadButton } from "./download-button"
import { FigmaButton } from "./figma-button"
import { GithubButton } from "./github-button"
import { LanguageToggle } from "./language-toggle"
import { ThemeToggle } from "./theme-toggle"

type HeaderProps = React.ComponentProps<"div">

export const Header = ({ className, children, ref, ...props }: HeaderProps) => {
	return (
		<div
			className={cn("grid grid-cols-2 px-lg py-xs", className)}
			ref={ref}
			{...props}
		>
			<div className="flex items-center gap-sm">
				<span className="style-text-strong-4">Suwa UI</span>
				<Badge tone="primary">v1.0.0</Badge>
			</div>
			<div className="flex w-full items-center justify-end gap-xs">
				<Input
					className={"w-1/2"}
					leadingIcon={MagnifyingGlassIcon}
					placeholder="Search anything..."
				/>
				<div className="flex items-center gap-3xs">
					<DownloadButton />
					<FigmaButton />
					<GithubButton />
					<LanguageToggle />
					<ThemeToggle />
				</div>
				<Profile
					compact
					fallbackText={"Avatar"}
					imageUrl={"https://github.com/shadcn.png"}
					profileEmail="dom.pittari@gmail.com"
					profileName={"Domenic Pittari"}
				/>
			</div>
			{children}
		</div>
	)
}
