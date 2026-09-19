import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { palettesSavedByUserId } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { authClient } from '#/lib/auth-client'
import { SavedPaletteCard } from './palette-card'

type SavedDashboardProps = Omit<React.ComponentProps<'div'>, 'children'>

export const SavedDashboard = ({ className, ref, ...props }: SavedDashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(palettesSavedByUserId(session?.user.id ?? ''))

  return (
    <Palette.Grid items={data} className={cn('', className)} ref={ref} {...props}>
      {(palette) => <SavedPaletteCard key={palette.id} palette={hydratePaletteState(palette)} />}
    </Palette.Grid>
  )
}
