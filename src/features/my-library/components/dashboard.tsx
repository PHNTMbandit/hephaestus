import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { userPalettes } from '#/features/palette/db/live-queries'
import { authClient } from '#/lib/auth-client'
import { MyLibraryPaletteCard } from './palette-card'

type MyLibraryDashboardProps = React.ComponentProps<'div'>

export const MyLibraryDashboard = ({
  className,
  children,
  ref,
  ...props
}: MyLibraryDashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(userPalettes(session?.user?.id ?? ''))

  return (
    <Palette.Grid className={cn('', className)} ref={ref} {...props}>
      {data?.map((palette) => (
        <MyLibraryPaletteCard key={palette.id} palette={palette} />
      ))}
      {children}
    </Palette.Grid>
  )
}
