import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { palettesByUserId } from '#/features/palette/db/live-queries'
import { authClient } from '#/lib/auth-client'
import { MyLibraryPaletteCard } from './palette-card'

type MyLibraryDashboardProps = Omit<React.ComponentProps<'div'>, 'children'>

export const MyLibraryDashboard = ({ className, ref, ...props }: MyLibraryDashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(palettesByUserId(session?.user?.id ?? ''))

  return (
    <Palette.Grid items={data} className={cn('', className)} ref={ref} {...props}>
      {(palette) => <MyLibraryPaletteCard key={palette.id} palette={palette} />}
    </Palette.Grid>
  )
}
