import { SwatchesIcon } from '@phosphor-icons/react/dist/ssr'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'
import { usePalette } from '../hooks/use-palette'

type PaletteEditProps = React.ComponentProps<typeof Button>

export const PaletteEdit = ({ className, children, ref, ...props }: PaletteEditProps) => {
  const { state } = usePalette()
  const { data } = authClient.useSession()

  if (state.userId !== data?.user.id) {
    return null
  }

  return (
    <Link to={'/palette-generator/{-$paletteId}'} params={{ paletteId: state.id }}>
      <Button tone="neutral" variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
        <SwatchesIcon weight="bold" />
        Edit
        {children}
      </Button>
    </Link>
  )
}
