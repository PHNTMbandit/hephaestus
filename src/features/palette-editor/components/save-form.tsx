import { CaretUpDownIcon } from '@phosphor-icons/react'
import { useDbClient } from '@tanstack/react-db'
import { mergeForm, useTransform, type ServerFormState } from '@tanstack/react-form-start'
import { useNavigate } from '@tanstack/react-router'
import {
  AlertTitle,
  cn,
  Field,
  Form,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  stackToastManager,
  useAppForm,
} from 'dawn-ui-react'
import { flushSync } from 'react-dom'
import { paletteCollection } from '#/features/palette/db/collection'
import { usePalette } from '#/features/palette/hooks/use-palette'
import {
  paletteSaveSchema,
  savePaletteFormOpts,
} from '#/features/palette/schema/palette-save-schema'
import { handleSavePaletteForm } from '#/features/palette/server/palette-save-action'
import { m } from '#/paraglide/messages'

type PaletteSaveFormProps = React.ComponentProps<'form'> & {
  saveFormState?:
    | ServerFormState<any, undefined>
    | { errorMap: { onServer: undefined }; errors: never[] }
}

export const PaletteSaveForm = ({
  saveFormState,
  className,
  children,
  ref,
  ...props
}: PaletteSaveFormProps) => {
  const navigate = useNavigate()
  const collection = useDbClient().collection(paletteCollection)
  const { state, dispatch } = usePalette()

  const form = useAppForm({
    ...savePaletteFormOpts,
    validators: {
      onSubmit: paletteSaveSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await handleSavePaletteForm({
          data: {
            name: value.name,
            visibility: value.visibility,
            description: value.description,
            colors: JSON.stringify(state.colors),
            baseColor: state.baseColor,
          },
        })

        if (!response.success) {
          form.setErrorMap({ onSubmit: response.error })
          return
        }

        await collection.utils.refetch()
        flushSync(() => {
          dispatch({ type: 'SET_IS_SAVING', payload: { saving: true } })
        })
        await navigate({
          to: '/palette-generator/{-$projectId}',
          params: { projectId: response.id },
        })
        stackToastManager.add({
          title: m['colorPalette.toasts.saveSuccess.title'](),
          description: m['colorPalette.toasts.saveSuccess.description'](),
          variant: 'success',
        })
      } catch (error) {
        form.setErrorMap({
          onSubmit: {
            form: error instanceof Error ? error.message : 'Unable to reach the server.',
            fields: {},
          },
        })
        stackToastManager.add({
          title: m['colorPalette.toasts.saveError.title'](),
          description: error instanceof Error ? error.message : String(error),
          variant: 'error',
        })
      }
    },
    transform: useTransform(
      (baseForm) =>
        mergeForm(baseForm, saveFormState ?? { errorMap: { onServer: undefined }, errors: [] }),
      [saveFormState],
    ),
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      method="post"
      encType="multipart/form-data"
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <form.AppForm>
        <form.FormErrors>
          <AlertTitle>There was an error saving the palette.</AlertTitle>
        </form.FormErrors>
        <form.FormSet>
          <form.FormSetContent>
            <form.AppField name="name">
              {(field) => (
                <Field>
                  <field.FieldLabel>Name</field.FieldLabel>
                  <field.FieldInput
                    placeholder="Enter a name for your palette"
                    variant={'secondary'}
                  />
                  <field.FieldErrors />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <Field>
                  <field.FieldLabel>Description</field.FieldLabel>
                  <field.FieldTextArea
                    placeholder="Enter a description for your palette"
                    maxLength={50}
                    variant={'secondary'}
                    className="resize-y"
                  />
                  <field.FieldErrors />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="visibility">
              {(field) => (
                <Field>
                  <field.FieldLabel>Visibility</field.FieldLabel>
                  <field.FieldSelect>
                    <SelectTrigger variant={'secondary'}>
                      <SelectValue>
                        {(value: string | undefined) => {
                          if (!value) return 'Select visibility'
                          switch (value) {
                            case 'public':
                              return 'Public'
                            case 'unlisted':
                              return 'Unlisted'
                            case 'private':
                              return 'Private'
                            default:
                              return 'Select visibility'
                          }
                        }}
                      </SelectValue>
                      <SelectIcon>
                        <CaretUpDownIcon weight="bold" />
                      </SelectIcon>
                    </SelectTrigger>
                    <SelectPopup>
                      <SelectList>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="unlisted">Unlisted</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectList>
                    </SelectPopup>
                  </field.FieldSelect>
                  <field.FieldErrors />
                </Field>
              )}
            </form.AppField>
          </form.FormSetContent>
        </form.FormSet>
        <form.FormFooter>
          <form.FormReset variant={'outline'} tone="neutral">
            Reset
          </form.FormReset>
          <form.FormSubmit>Save</form.FormSubmit>
        </form.FormFooter>
        {children}
      </form.AppForm>
    </Form>
  )
}
