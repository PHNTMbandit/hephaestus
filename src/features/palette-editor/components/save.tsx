import { HeartIcon } from '@phosphor-icons/react'
import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from 'dawn-ui-react'
import React from 'react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { PaletteEditorSaveForm } from './save-form'

import type { ServerFormState } from '@tanstack/react-form-start'

type PaletteEditorSaveProps = React.ComponentProps<'button'> & {
  saveFormState?:
    | ServerFormState<any, undefined>
    | { errorMap: { onServer: undefined }; errors: never[] }
}

export const PaletteEditorSave = ({
  saveFormState,
  className,
  children,
  ref,
  ...props
}: PaletteEditorSaveProps) => {
  const { state } = usePalette()

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'ghost'} className={cn('shrink-0', className)} ref={ref} {...props}>
          {children}
          <HeartIcon weight="bold" />
          Save
        </Button>
      </DialogTrigger>
      <DialogPopup className={'w-[50vh]'}>
        <DialogHeader>
          <DialogTitle>Save Palette</DialogTitle>
          <DialogDescription>Are you sure you want to save this palette?</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Palette.Root
            key={state.colors.map(({ id }) => id).join(',')}
            initialState={{ colors: state.colors }}
          >
            <Palette.Swatches orientation={'horizontal'} rounded="xxLarge" size="medium">
              {({ color }) => (
                <Color.Provider color={color}>
                  <Color.Swatch />
                </Color.Provider>
              )}
            </Palette.Swatches>
          </Palette.Root>
          <PaletteEditorSaveForm saveFormState={saveFormState} />
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}
