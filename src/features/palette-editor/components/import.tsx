import {
  ArrowsCounterClockwiseIcon,
  CaretUpDownIcon,
  CheckIcon,
  DownloadSimpleIcon,
} from '@phosphor-icons/react'
import {
  AlertTitle,
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Form,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
  useAppForm,
} from 'dawn-ui-react'
import React from 'react'
import { Color as ColorComponent } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { valueTypesList } from '#/features/palette/constants/values'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { paletteImportSchema } from '#/features/palette/schema/palette-import-schema'
import { parseColorValues, type ColorValueTypeId } from '#/features/palette/utils/parse'

import type { Color } from '#/features/color/color.types'

type PaletteImportProps = React.ComponentProps<typeof Button>

export const PaletteImport = ({ className, children, ref, ...props }: PaletteImportProps) => {
  const [previewColors, setPreviewColors] = React.useState<Color[]>([])
  const [open, setOpen] = React.useState(false)
  const { dispatch } = usePalette()
  const form = useAppForm({
    defaultValues: {
      valueType: valueTypesList[0].value,
      values: '',
    },
    validators: {
      onSubmit: paletteImportSchema,
    },

    onSubmit: ({ formApi, value }) => {
      try {
        const colors: Color[] = parseColorValues(
          value.values,
          value.valueType as ColorValueTypeId,
        ).map((parsedValue) => ({
          id: crypto.randomUUID(),
          value: parsedValue,
          locked: false,
        }))
        setPreviewColors(colors)
      } catch (error) {
        formApi.setErrorMap({
          onSubmit: {
            '': [{ message: error instanceof Error ? error.message : 'Unable to parse colors' }],
          },
        })
      }
    },
  })

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setPreviewColors([])
      form.reset()
    }
  }

  const handleReset = () => {
    setPreviewColors([])
    form.reset()
  }

  const handleSubmit = () => {
    dispatch({ type: 'SET_COLORS', payload: { colors: previewColors } })
    handleOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button tone="neutral" variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
          {children}
          <DownloadSimpleIcon weight="bold" className="shrink-0" />
          Import
        </Button>
      </DialogTrigger>
      <DialogPopup className={'w-1/3 bg-surface-3!'}>
        <DialogHeader>
          <DialogTitle>Import Palette</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            onReset={handleReset}
          >
            <form.AppForm>
              <form.FormErrors>
                <AlertTitle>There were some problems with your submission</AlertTitle>
              </form.FormErrors>
              <form.FormSet>
                <form.FormSetContent>
                  <form.AppField
                    name="valueType"
                    listeners={{
                      onChange: () => {
                        setPreviewColors([])
                      },
                    }}
                  >
                    {(field) => (
                      <field.FieldSet>
                        <field.FieldSelect>
                          <SelectTrigger variant={'secondary'}>
                            <SelectValue>
                              {(value: string) =>
                                valueTypesList.find((v) => v.value === value)?.label ?? value
                              }
                            </SelectValue>
                            <SelectIcon>
                              <CaretUpDownIcon weight="bold" />
                            </SelectIcon>
                          </SelectTrigger>
                          <SelectPopup>
                            <SelectList>
                              {valueTypesList.map((valueType) => (
                                <SelectItem key={valueType.value} value={valueType.value}>
                                  <SelectTitle>{valueType.label}</SelectTitle>
                                </SelectItem>
                              ))}
                            </SelectList>
                          </SelectPopup>
                        </field.FieldSelect>
                      </field.FieldSet>
                    )}
                  </form.AppField>
                  <form.AppField
                    name="values"
                    listeners={{
                      onChange: () => {
                        setPreviewColors([])
                      },
                    }}
                  >
                    {(field) => (
                      <field.FieldSet>
                        <field.FieldTextArea
                          variant={'secondary'}
                          placeholder="Enter color values separated by commas, spaces, or newlines"
                          className="min-h-[20vh] resize-y"
                        />
                      </field.FieldSet>
                    )}
                  </form.AppField>
                </form.FormSetContent>
              </form.FormSet>
              <Palette.Root
                key={previewColors.map(({ id }) => id).join(',')}
                initialState={{ colors: previewColors }}
              >
                <Palette.Swatches orientation={'horizontal'} rounded="xxLarge">
                  {({ color }) => (
                    <ColorComponent.Provider color={color}>
                      <ColorComponent.Swatch />
                    </ColorComponent.Provider>
                  )}
                </Palette.Swatches>
              </Palette.Root>
              <form.FormFooter>
                <form.FormReset tone="neutral" variant={'outline'}>
                  <ArrowsCounterClockwiseIcon weight="bold" />
                  Reset
                </form.FormReset>
                {previewColors.length > 0 ? (
                  <Button tone="success" className={'w-full'} onClick={handleSubmit}>
                    <CheckIcon weight="bold" />
                    Submit
                  </Button>
                ) : (
                  <form.FormSubmit>
                    <DownloadSimpleIcon weight="bold" /> Import
                  </form.FormSubmit>
                )}
              </form.FormFooter>
            </form.AppForm>
          </Form>
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}
