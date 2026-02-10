import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form-start"
import { redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import {
	getResponseHeaders,
	setResponseStatus,
} from "@tanstack/react-start/server"
import { APIError } from "better-auth"
import { auth } from "@/lib/auth"
import { signInFormOpts, signInSchema } from "../schema/sign-in-schema"

const serverValidate = createServerValidate({
	...signInFormOpts,
	onServerValidate: async ({ value }) => {
		const { data, error, success } = await signInSchema.safeParseAsync(value)
		if (!success) {
			return error.message
		}

		try {
			const headers = await getResponseHeaders()
			console.log("Sign-in attempt:", { email: data.email, headers })

			const response = await auth.api.signInEmail({
				body: {
					email: data.email,
					password: data.password,
				},
				headers: headers,
			})

			console.log("Sign-in response:", response)
		} catch (error) {
			console.error("Sign-in error:", error)
			if (error instanceof APIError) {
				return error.message
			}
			// Re-throw non-APIError exceptions
			throw error
		}
	},
})

export const handleSignInForm = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Invalid form data")
		}
		return data
	})
	.handler(async (ctx) => {
		try {
			await serverValidate(ctx.data)
			return redirect({ to: "/dashboard" })
		} catch (error) {
			if (error instanceof ServerValidateError) {
				return error.response
			}

			setResponseStatus(500)
			return "There was an internal error"
		}
	})
