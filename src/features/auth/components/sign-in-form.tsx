import {
	AtIcon,
	PasswordIcon,
	SignInIcon,
	WarningIcon,
} from "@phosphor-icons/react/dist/ssr"
import {
	mergeForm,
	type ServerFormState,
	useTransform,
} from "@tanstack/react-form-start"
import { AlertHeader, cn, Field, Form, useAppForm } from "suwa-ui"
import { signInFormOpts } from "../schema/sign-in-schema"
import { handleSignInForm } from "../server/sign-in-action"

type SignInFormProps = React.ComponentProps<"div"> & {
	state:
		| ServerFormState<any, undefined>
		| { errorMap: { onServer: undefined }; errors: never[] }
}

export const SignInForm = ({
	state,
	className,
	children,
	ref,
	...props
}: SignInFormProps) => {
	const form = useAppForm({
		...signInFormOpts,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
	})

	return (
		<div className={cn("", className)} ref={ref} {...props}>
			{children}
			<Form
				action={handleSignInForm.url}
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
					<form.AppField name="email">
						{(field) => {
							return (
								<Field>
									<field.FieldInput
										leadingIcon={AtIcon}
										placeholder="Email"
										required
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
								<field.FieldInput
									leadingIcon={PasswordIcon}
									placeholder="Password"
									required
									type="password"
								/>
								<field.FieldErrors />
							</Field>
						)}
					</form.AppField>
					<form.FormSubmit>
						<SignInIcon weight="bold" />
						Sign In
					</form.FormSubmit>
				</form.AppForm>
			</Form>
		</div>
	)
}
