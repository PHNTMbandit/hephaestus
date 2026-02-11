import { GridFourIcon, NotepadIcon } from "@phosphor-icons/react"
import { m } from "@/paraglide/messages"
import type { SecureRoute } from "../types/secure-route"

export const secureRoutes: SecureRoute[] = [
	{
		leadingIcon: GridFourIcon,
		label: m["sidebar.dashboard-label"](),
		linkOptions: { to: "/dashboard" },
	},
	{
		leadingIcon: NotepadIcon,
		label: m["sidebar.projects-label"](),
		linkOptions: { to: "/projects" },
	},
]
