import { CircleNotchIcon, FloppyDiskIcon } from '@phosphor-icons/react/dist/ssr'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, cn, stackToastManager } from 'dawn-ui-react'
import { m } from '#/paraglide/messages.js'
import { savePalette } from '../utils'

type PaletteSaveProps = React.ComponentProps<'button'>

export const PaletteSave = ({ className, children, ref, ...props }: PaletteSaveProps) => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: savePalette,
    onError: (error) => {
      stackToastManager.add({
        title: m['colourPalette.toasts.saveError.title'](),
        description: error.message,
        variant: 'error',
      })
      console.error('Failed to save palette', error)
    },
    onSuccess: (data) => {
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
        palette: [],
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
      {m['colourPalette.buttons.save']()}
    </Button>
  )
}
