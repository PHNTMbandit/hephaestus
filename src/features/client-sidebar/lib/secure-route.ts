import { GridFourIcon, NotepadIcon } from "@phosphor-icons/react"
import type { SecureRoute } from "../types/secure-route"

export const secureRoutes: SecureRoute[] = [
	{
		leadingIcon: GridFourIcon,
		label: "Dashboard",
		linkOptions: { to: "/dashboard" },
	},
	{
		leadingIcon: NotepadIcon,
		label: "Projects",
		linkOptions: { to: "/projects" },
	},
]
