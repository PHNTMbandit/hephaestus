import { HeartIcon } from '@phosphor-icons/react'
import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { useDbClient } from '@tanstack/react-db'
import { useNavigate } from '@tanstack/react-router'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import React from 'react'
import { flushSync } from 'react-dom'
import { m } from '#/paraglide/messages.js'
import { paletteCollection } from '../db/collection'
import { usePalette } from '../hooks/use-palette'
import { serializePaletteState } from '../utils/state'

type PaletteSaveProps = React.ComponentProps<'button'>

export const PaletteSave = ({ className, children, ref, ...props }: PaletteSaveProps) => {
  const navigate = useNavigate()
  const collection = useDbClient().collection(paletteCollection)
  const { state, dispatch } = usePalette()
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    const id = crypto.randomUUID()
    const palette = serializePaletteState(state)

    startTransition(async () => {
      const tx = collection.insert({
        id,
        baseColor: palette.baseColor,
        colors: palette.colors,
        name: `Palette ${new Date().toLocaleString()}`,
      })

      try {
        await tx.isPersisted.promise
        stackToastManager.add({
          title: m['colorPalette.toasts.saveSuccess.title'](),
          description: m['colorPalette.toasts.saveSuccess.description'](),
          variant: 'success',
        })
        flushSync(() => {
          dispatch({ type: 'SET_IS_SAVING', payload: { saving: true } })
        })
        navigate({ to: '/palette-generator/{-$projectId}', params: { projectId: id } })
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
      <Button variant={'ghost'} disabled className={cn('shrink-0', className)} ref={ref} {...props}>
        <CircleNotchIcon weight="bold" className="animate-spin" />
        Creating palette...
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
      <HeartIcon weight="bold" />
      Save
    </Button>
  )
}
