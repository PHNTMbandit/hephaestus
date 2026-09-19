import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useDbClient } from '@tanstack/react-db'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import React from 'react'
import { paletteCollection } from '#/features/palette/db/palette-collection'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { serializePaletteState } from '#/features/palette/utils/state'
import { m } from '#/paraglide/messages.js'

type PaletteEditorUpdateProps = React.ComponentProps<'button'> & {
  paletteId: string
}

export const PaletteEditorUpdate = ({
  paletteId,
  className,
  children,
  ref,
  ...props
}: PaletteEditorUpdateProps) => {
  const collection = useDbClient().collection(paletteCollection)
  const { state } = usePalette()
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    const palette = serializePaletteState(state)

    startTransition(async () => {
      const tx = collection.update(paletteId, (draft) => {
        draft.baseColor = palette.baseColor
        draft.colors = palette.colors
      })

      try {
        await tx.isPersisted.promise
        stackToastManager.add({
          title: m['colorPalette.toasts.updateSuccess.title'](),
          description: m['colorPalette.toasts.updateSuccess.description'](),
          variant: 'success',
        })
      } catch (error) {
        stackToastManager.add({
          title: m['colorPalette.toasts.updateError.title'](),
          description: error instanceof Error ? error.message : String(error),
          variant: 'error',
        })
      }
    })
  }

  if (isPending) {
    return (
      <Button disabled variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
        <CircleNotchIcon weight="bold" className="animate-spin" />
        Updating...
      </Button>
    )
  }

  return (
    <Button
      onClick={handleClick}
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
    >
      {children}
      <FloppyDiskIcon weight="bold" />
      Update
    </Button>
  )
}
