import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { palettesSavedByUserId } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { authClient } from '#/lib/auth-client'
import { SavedPaletteCard } from './palette-card'

type SavedDashboardProps = React.ComponentProps<'div'>

export const SavedDashboard = ({ className, children, ref, ...props }: SavedDashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(palettesSavedByUserId(session?.user.id ?? ''))

  return (
    <Palette.Grid className={cn('', className)} ref={ref} {...props}>
      {data?.map((palette) => (
        <SavedPaletteCard key={palette.id} palette={hydratePaletteState(palette)} />
      ))}
      {children}
    </Palette.Grid>
  )
}
