import { redirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { sessionMiddleware } from "./session-middleware"

export const authMiddleware = createMiddleware()
	.middleware([sessionMiddleware])
	.server(async ({ next, context }) => {
		const { session } = context

		if (!session) {
			throw redirect({ to: "/sign-in" })
		}

		return await next()
	})
