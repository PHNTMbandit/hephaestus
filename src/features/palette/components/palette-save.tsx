import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useNavigate, useRouteContext } from '@tanstack/react-router'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import React from 'react'
import { m } from '#/paraglide/messages.js'
import { usePalette } from '../hooks/use-palette'

type PaletteSaveProps = React.ComponentProps<'button'>

export const PaletteSave = ({ className, children, ref, ...props }: PaletteSaveProps) => {
  const navigate = useNavigate()
  const { paletteCollection } = useRouteContext({ from: '__root__' })
  const { state } = usePalette()
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    const id = crypto.randomUUID()

    startTransition(async () => {
      const tx = paletteCollection.insert({
        id,
        baseColor: state.baseColor,
        colors: state.colors,
        name: `Palette ${new Date().toLocaleString()}`,
      })

      try {
        await tx.isPersisted.promise
        stackToastManager.add({
          title: m['colorPalette.toasts.saveSuccess.title'](),
          description: m['colorPalette.toasts.saveSuccess.description'](),
          variant: 'success',
        })
        navigate({ to: '/color-palette/{-$projectId}', params: { projectId: id } })
      } catch (error) {
        stackToastManager.add({
          title: m['colorPalette.toasts.saveError.title'](),
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
        size="iconMedium"
        tone="neutral"
        variant={'ghost'}
        className={cn('shrink-0', className)}
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
      size="iconMedium"
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
