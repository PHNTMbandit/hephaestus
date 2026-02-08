import {
	AtIcon,
	PasswordIcon,
	SignInIcon,
	UserIcon,
	WarningIcon,
} from "@phosphor-icons/react/dist/ssr"
import {
	mergeForm,
	type ServerFormState,
	useTransform,
} from "@tanstack/react-form-start"
import { AlertHeader, cn, Field, Form, useAppForm } from "suwa-ui"
import { signUpFormOpts } from "../schema/sign-up-schema"
import { handleSignUpForm } from "../server/sign-up-action"

type SignUpFormProps = React.ComponentProps<"div"> & {
	state:
		| ServerFormState<any, undefined>
		| { errorMap: { onServer: undefined }; errors: never[] }
}

export const SignUpForm = ({
	state,
	className,
	children,
	ref,
	...props
}: SignUpFormProps) => {
	const form = useAppForm({
		...signUpFormOpts,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	})

	return (
		<div className={cn("", className)} ref={ref} {...props}>
			{children}
			<Form
				action={handleSignUpForm.url}
				encType={"multipart/form-data"}
				method="post"
			>
				<form.AppForm>
					<form.FormErrors>
						<AlertHeader>
							<WarningIcon weight="bold" />
							Something went wrong. Please try again.
						</AlertHeader>
					</form.FormErrors>
					<div className="flex items-center gap-xs">
						<form.AppField name="firstName">
							{(field) => {
								return (
									<Field>
										<field.FieldLabel />
										<field.FieldInput
											leadingIcon={UserIcon}
											placeholder="Enter your first name"
										/>
										<field.FieldErrors />
									</Field>
								)
							}}
						</form.AppField>
						<form.AppField name="lastName">
							{(field) => {
								return (
									<Field>
										<field.FieldLabel />
										<field.FieldInput
											leadingIcon={UserIcon}
											placeholder="Enter your last name"
										/>
										<field.FieldErrors />
									</Field>
								)
							}}
						</form.AppField>
					</div>
					<form.AppField name="email">
						{(field) => {
							return (
								<Field>
									<field.FieldLabel />
									<field.FieldInput
										leadingIcon={AtIcon}
										placeholder="Enter your email address"
										type="email"
									/>
									<field.FieldErrors />
								</Field>
							)
						}}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<Field>
								<field.FieldLabel />
								<field.FieldInput
									leadingIcon={PasswordIcon}
									placeholder="Enter a unique password"
									type="password"
								/>
								<field.FieldErrors />
							</Field>
						)}
					</form.AppField>
					<form.AppField
						name="confirmPassword"
						validators={{
							onChangeListenTo: ["password"],
							onChange: ({ value, fieldApi }) => {
								const password = fieldApi.form.getFieldValue("password")
								if (value && value !== password) {
									return new Error("Passwords do not match")
								}
							},
						}}
					>
						{(field) => (
							<Field>
								<field.FieldLabel />
								<field.FieldInput
									leadingIcon={PasswordIcon}
									placeholder="Confirm your password"
									type="password"
								/>
								<field.FieldErrors />
							</Field>
						)}
					</form.AppField>
					<form.FormSubmit>
						<SignInIcon weight="bold" />
						Sign Up
					</form.FormSubmit>
				</form.AppForm>
			</Form>
		</div>
	)
}
