import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { cn, MenuItem } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteMenuOpenProps = React.ComponentProps<typeof MenuItem>

export const PaletteMenuOpen = ({ className, children, ref, ...props }: PaletteMenuOpenProps) => {
  const { state } = usePalette()

  return (
    <Link to={'/palette-generator/{-$paletteId}'} params={{ paletteId: state.id }}>
      <MenuItem className={cn('', className)} ref={ref} {...props}>
        <ArrowSquareOutIcon weight="bold" />
        Open
        {children}
      </MenuItem>
    </Link>
  )
}
