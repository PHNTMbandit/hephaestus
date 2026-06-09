import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import { m } from '#/paraglide/messages.js'
import { usePalette } from '../hooks/use-palette'
import { getPaletteQueryOptions, updatePalette } from '../utils'

import type { Colour } from '#/features/colour/colour.types.ts'

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
  const queryClient = useQueryClient()
  const { state } = usePalette()

  const mutation = useMutation({
    mutationFn: updatePalette,
    onError: (error) => {
      stackToastManager.add({
        title: m['colourPalette.toasts.updateError.title'](),
        description: error.message + ' ' + error.cause,
        variant: 'error',
      })
      console.error('Failed to update palette', error.cause)
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        getPaletteQueryOptions(variables.data.id).queryKey,
        (current: { id: string; name: string; colours: Colour[] } | null | undefined) => {
          if (!current) {
            return current
          }

          return {
            ...current,
            colours: variables.data.colours,
          }
        },
      )
      stackToastManager.add({
        title: m['colourPalette.toasts.updateSuccess.title'](),
        description: m['colourPalette.toasts.updateSuccess.description'](),
        variant: 'success',
      })
    },
  })

  const handleClick = () => {
    mutation.mutate({
      data: {
        id: paletteId,
        colours: state.colours,
      },
    })
  }

  if (mutation.isPending) {
    return (
      <Button disabled tone="accent" className={cn('', className)} ref={ref} {...props}>
        <CircleNotchIcon weight="bold" className="animate-spin" />
      </Button>
    )
  }

  return (
    <Button onClick={handleClick} tone="accent" className={cn('', className)} ref={ref} {...props}>
      {children}
      <FloppyDiskIcon weight="bold" />
      {m['colourPalette.buttons.update']()}
    </Button>
  )
}
