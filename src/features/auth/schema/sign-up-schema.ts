import { formOptions } from "@tanstack/react-form-start"
import { z } from "zod"

export const signUpSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.email().min(1, "Email is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z
			.string()
			.min(6, "Confirm Password must be at least 6 characters"),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords do not match",
				path: ["confirmPassword"],
			})
		}
	})

export const signUpFormOpts = formOptions({
	defaultValues: {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	},
})
