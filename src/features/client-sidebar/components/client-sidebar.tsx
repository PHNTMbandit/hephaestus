import { Link } from "@tanstack/react-router"
import type * as React from "react"
import {
	cn,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuLink,
} from "suwa-ui"
import { LanguageToggle } from "@/components/language-toggle"
import { secureRoutes } from "../lib/secure-route"

type ClientSidebarProps = React.ComponentProps<"div">

export const ClientSidebar = ({
	className,
	children,
	ref,
	...props
}: ClientSidebarProps) => {
	return (
		<Sidebar className={cn(className)} ref={ref} {...props} width={300}>
			<SidebarHeader>Hesphaestus</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{secureRoutes.map((route) => (
								<Link key={route.label} {...route.linkOptions}>
									{({ isActive }) => (
										<SidebarMenuLink
											isActive={isActive}
											label={route.label}
											leadingIcon={route.leadingIcon}
										/>
									)}
								</Link>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<LanguageToggle />
			</SidebarFooter>
			{children}
		</Sidebar>
	)
}
