import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { savedPalettes } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { authClient } from '#/lib/auth-client'

type DashboardProps = React.ComponentProps<'div'>

export const Dashboard = ({ className, children, ref, ...props }: DashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(savedPalettes(session?.user.id ?? ''))

  return (
    <div
      className={cn(
        'grid auto-rows-[100px] grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-sm p-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {data?.map((palette) => (
        <div key={palette.id} className="flex flex-col gap-sm">
          <Palette.Card palette={hydratePaletteState(palette)}>
            <Palette.Swatches orientation={'horizontal'}>
              {({ color }) => (
                <Color.Provider color={color}>
                  <Color.Swatch />
                </Color.Provider>
              )}
            </Palette.Swatches>
            <Palette.CardFooter>
              <Link to="/palette-generator/{-$paletteId}" params={{ paletteId: palette.id }}>
                <Palette.Name />
              </Link>
              <Palette.Saves />
            </Palette.CardFooter>
          </Palette.Card>
        </div>
      ))}
      {children}
    </div>
  )
}
