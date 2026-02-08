import { createServerFn } from "@tanstack/react-start"
import { getRequest, setCookie } from "@tanstack/react-start/server"
import * as z from "zod"

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")])
export type T = z.infer<typeof postThemeValidator>
const storageKey = "_preferred-theme"

export const getThemeServerFn = createServerFn().handler(async () => {
	const request = getRequest()
	const cookieHeader = request.headers.get("cookie")
	const cookies = new Map(
		(cookieHeader ?? "")
			.split("; ")
			.map((cookie) => cookie.split("=") as [string, string]),
	)
	const theme = (cookies.get(storageKey) as T | undefined) ?? "light"
	return theme
})

export const setThemeServerFn = createServerFn({ method: "POST" })
	.inputValidator(postThemeValidator)
	.handler(async ({ data }) => setCookie(storageKey, data))
