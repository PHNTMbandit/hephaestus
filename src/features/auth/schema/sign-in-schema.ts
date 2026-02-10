import { formOptions } from "@tanstack/react-form-start"
import { z } from "zod"

export const signInSchema = z.object({
	email: z.email().min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signInFormOpts = formOptions({
	defaultValues: {
		email: "",
		password: "",
	},
	validators: {
		onSubmit: signInSchema,
	},
})
