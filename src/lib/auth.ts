import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { createAuthClient } from "better-auth/react"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { db } from "@/db"
import { account, session, user, verification } from "@/db/schema"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: user,
			session: session,
			account: account,
			verification: verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
	secret: process.env.BETTER_AUTH_SECRET,
	plugins: [tanstackStartCookies()],
})

export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
	secret: process.env.BETTER_AUTH_SECRET,
})
