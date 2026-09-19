import { SwatchesIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { cn, MenuItem } from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'
import { usePalette } from '../hooks/use-palette'

type PaletteMenuEditProps = React.ComponentProps<typeof MenuItem>

export const PaletteMenuEdit = ({ className, children, ref, ...props }: PaletteMenuEditProps) => {
  const { state } = usePalette()
  const { data } = authClient.useSession()

  if (state.userId !== data?.user.id) {
    return null
  }

  return (
    <Link to={'/palette-generator/{-$paletteId}'} params={{ paletteId: state.id }}>
      <MenuItem className={cn('', className)} ref={ref} {...props}>
        <SwatchesIcon weight="bold" />
        Edit
        {children}
      </MenuItem>
    </Link>
  )
}
