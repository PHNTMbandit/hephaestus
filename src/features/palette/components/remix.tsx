import { VinylRecordIcon } from '@phosphor-icons/react/dist/ssr'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'
import { usePalette } from '../hooks/use-palette'
import { parseColorsToSearchParams } from '../utils/parse'

type PaletteRemixProps = React.ComponentProps<typeof Button>

export const PaletteRemix = ({ className, children, ref, ...props }: PaletteRemixProps) => {
  const { state } = usePalette()
  const { data } = authClient.useSession()
  const search = parseColorsToSearchParams(state.colors)

  if (state.userId === data?.user.id) {
    return null
  }

  return (
    <Link to={'/palette-generator/{-$paletteId}'} search={{ colors: search }}>
      <Button tone="neutral" variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
        <VinylRecordIcon weight="bold" />
        Remix
        {children}
      </Button>
    </Link>
  )
}
