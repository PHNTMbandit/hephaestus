import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { publicPalettes } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'

type ExploreDashboardProps = React.ComponentProps<'div'>

export const ExploreDashboard = ({ className, children, ref, ...props }: ExploreDashboardProps) => {
  const { data } = useLiveSuspenseQuery(publicPalettes())

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
