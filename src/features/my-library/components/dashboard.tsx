import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { userPalettes } from '#/features/palette/db/live-queries'
import { authClient } from '#/lib/auth-client'

type DashboardProps = React.ComponentProps<'div'>

export const Dashboard = ({ className, children, ref, ...props }: DashboardProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(userPalettes(session?.user?.id ?? ''))

  return (
    <div
      className={cn(
        'grid auto-rows-min grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-sm p-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {data?.map((palette) => (
        <Palette.Card key={palette.id} palette={palette}>
          <Palette.Swatches orientation="horizontal" size={'large'}>
            {({ color }) => (
              <Color.Provider color={color}>
                <Color.Swatch />
              </Color.Provider>
            )}
          </Palette.Swatches>
          <Palette.CardFooter>
            <Link to="/palette-generator/{-$paletteId}" params={{ paletteId: palette.id }}>
              <Button variant={'link'} tone="neutral">
                <Palette.Name />
              </Button>
            </Link>
          </Palette.CardFooter>
          {children}
        </Palette.Card>
      ))}
    </div>
  )
}
