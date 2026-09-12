import { VinylRecordIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { cn, MenuItem } from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'
import { usePalette } from '../hooks/use-palette'
import { parseColorsToSearchParams } from '../utils/parse'

type PaletteMenuRemixProps = React.ComponentProps<typeof MenuItem>

export const PaletteMenuRemix = ({ className, children, ref, ...props }: PaletteMenuRemixProps) => {
  const { state } = usePalette()
  const { data } = authClient.useSession()
  const search = parseColorsToSearchParams(state.colors)

  if (state.userId === data?.user.id) {
    return null
  }

  return (
    <Link to={'/palette-generator/{-$paletteId}'} search={{ colors: search }}>
      <MenuItem className={cn('', className)} ref={ref} {...props}>
        <VinylRecordIcon weight="bold" />
        Remix
        {children}
      </MenuItem>
    </Link>
  )
}
