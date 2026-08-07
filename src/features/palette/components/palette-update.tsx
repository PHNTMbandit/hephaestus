import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useRouteContext } from '@tanstack/react-router'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import React from 'react'
import { m } from '#/paraglide/messages.js'
import { usePalette } from '../hooks/use-palette'
import { serializePaletteState } from '../utils/state'

type PaletteUpdateProps = React.ComponentProps<'button'> & {
  paletteId: string
}

export const PaletteUpdate = ({
  paletteId,
  className,
  children,
  ref,
  ...props
}: PaletteUpdateProps) => {
  const { paletteCollection } = useRouteContext({ from: '__root__' })
  const { state } = usePalette()
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    const palette = serializePaletteState(state)

    startTransition(async () => {
      const tx = paletteCollection.update(paletteId, (draft) => {
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
      <Button
        disabled
        tone="neutral"
        variant={'ghost'}
        size={'iconMedium'}
        className={cn('', className)}
        ref={ref}
        {...props}
      >
        <CircleNotchIcon weight="bold" className="animate-spin" />
      </Button>
    )
  }

  return (
    <Button
      onClick={handleClick}
      size={'iconMedium'}
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
    >
      {children}
      <FloppyDiskIcon weight="bold" />
    </Button>
  )
}
