import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { savedPalettes } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { authClient } from '#/lib/auth-client'

type FavoritesDashboardProps = React.ComponentProps<'div'>

export const FavoritesDashboard = ({
  className,
  children,
  ref,
  ...props
}: FavoritesDashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(savedPalettes(session?.user.id ?? ''))

  return (
    <Palette.Grid className={cn('', className)} ref={ref} {...props}>
      {data?.map((palette) => (
        <Palette.Card key={palette.id} palette={hydratePaletteState(palette)}>
          <Palette.Swatches>
            {({ color }) => (
              <Color.Provider color={color}>
                <Color.Swatch />
              </Color.Provider>
            )}
          </Palette.Swatches>
          <Palette.CardFooter>
            <Palette.Link>
              <Palette.Name />
            </Palette.Link>
            <Palette.Saves />
          </Palette.CardFooter>
        </Palette.Card>
      ))}
      {children}
    </Palette.Grid>
  )
}
