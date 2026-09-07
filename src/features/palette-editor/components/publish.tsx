import { GlobeIcon } from '@phosphor-icons/react'
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
import { PaletteEditorPublishForm } from './publish-form'

import type { ServerFormState } from '@tanstack/react-form-start'

type PaletteEditorPublishProps = React.ComponentProps<'button'> & {
  publishFormState?:
    | ServerFormState<any, undefined>
    | { errorMap: { onServer: undefined }; errors: never[] }
}

export const PaletteEditorPublish = ({
  publishFormState,
  className,
  children,
  ref,
  ...props
}: PaletteEditorPublishProps) => {
  const { state } = usePalette()

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'ghost'} className={cn('shrink-0', className)} ref={ref} {...props}>
          {children}
          <GlobeIcon weight="bold" />
          Publish
        </Button>
      </DialogTrigger>
      <DialogPopup className={'w-[50vh]'}>
        <DialogHeader>
          <DialogTitle>Publish Palette</DialogTitle>
          <DialogDescription>Are you sure you want to publish this palette?</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <Palette.Root
            key={state.colors.map(({ id }) => id).join(',')}
            initialState={{ colors: state.colors }}
          >
            <Palette.Swatches orientation={'horizontal'} size="medium">
              {({ color }) => (
                <Color.Provider color={color}>
                  <Color.Swatch />
                </Color.Provider>
              )}
            </Palette.Swatches>
          </Palette.Root>
          <PaletteEditorPublishForm publishFormState={publishFormState} />
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}
