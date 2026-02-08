import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form-start"
import { redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { setResponseStatus } from "@tanstack/react-start/server"
import { APIError } from "better-auth"
import { auth } from "@/lib/auth"
import { signUpFormOpts, signUpSchema } from "../schema/sign-up-schema"

const serverValidate = createServerValidate({
	...signUpFormOpts,
	onServerValidate: async ({ value }) => {
		const { data, error, success } = await signUpSchema.safeParseAsync(value)
		if (!success) {
			return error.message
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: `${data.firstName} ${data.lastName}`,
					email: data.email,
					password: data.password,
				},
			})
		} catch (error) {
			if (error instanceof APIError) {
				return error.message
			}
		}
	},
})

export const handleSignUpForm = createServerFn({ method: "POST" })
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
