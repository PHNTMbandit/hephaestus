import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import { m } from '#/paraglide/messages.js'
import { usePalette } from '../hooks/use-palette'
import { getPaletteQueryOptions, getPalettesQueryOptions, savePalette } from '../utils'

type PaletteSaveProps = React.ComponentProps<'button'>

export const PaletteSave = ({ className, children, ref, ...props }: PaletteSaveProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { state } = usePalette()

  const mutation = useMutation({
    mutationFn: savePalette,
    onError: (error) => {
      stackToastManager.add({
        title: m['colourPalette.toasts.saveError.title'](),
        description: error.message + ' ' + error.cause,
        variant: 'error',
      })
      console.error('Failed to save palette', error.cause)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(getPaletteQueryOptions(data.id).queryKey, () => data)
      queryClient.invalidateQueries({ queryKey: getPalettesQueryOptions.queryKey })
      stackToastManager.add({
        title: m['colourPalette.toasts.saveSuccess.title'](),
        description: m['colourPalette.toasts.saveSuccess.description'](),
        variant: 'success',
      })
      navigate({ to: '/colour-palette/{-$projectId}', params: { projectId: data.id } })
    },
  })

  const handleClick = () => {
    mutation.mutate({
      data: {
        name: `Palette ${new Date().toLocaleString()}`,
        baseColour: state.baseColour,
        colours: state.colours,
      },
    })
  }

  if (mutation.isPending) {
    return (
      <Button
        disabled
        tone="neutral"
        variant={'ghost'}
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
      tone="neutral"
      variant={'ghost'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <FloppyDiskIcon weight="bold" />
      <span className="hidden xl:block">{m['colourPalette.buttons.save']()}</span>
    </Button>
  )
}
