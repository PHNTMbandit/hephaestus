import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteOpenProps = React.ComponentProps<typeof Button>

export const PaletteOpen = ({ className, children, ref, ...props }: PaletteOpenProps) => {
  const { state } = usePalette()

  if (state.id === undefined) return null

  return (
    <Link data-slot="palette-open" to="/palette/$paletteId" params={{ paletteId: state.id }}>
      <Button
        variant={'ghost'}
        size={'small'}
        tone="neutral"
        className={cn('', className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    </Link>
  )
}
