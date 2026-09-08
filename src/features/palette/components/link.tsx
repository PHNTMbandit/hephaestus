import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteLinkProps = React.ComponentProps<typeof Button>

export const PaletteLink = ({ className, children, ref, ...props }: PaletteLinkProps) => {
  const { state } = usePalette()

  return (
    <Link
      data-slot="palette-link"
      to="/palette-generator/{-$paletteId}"
      params={{ paletteId: state.id }}
    >
      <Button variant={'link'} tone="neutral" className={cn('', className)} ref={ref} {...props}>
        {children}
      </Button>
    </Link>
  )
}
