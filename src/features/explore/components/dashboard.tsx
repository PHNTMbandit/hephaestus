import { eq, useDbClient, useLiveSuspenseQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { paletteCollection } from '#/features/palette/db/collection'
import { hydratePaletteState } from '#/features/palette/utils/state'

type DashboardProps = React.ComponentProps<'div'>

export const Dashboard = ({ className, children, ref, ...props }: DashboardProps) => {
  const collection = useDbClient().collection(paletteCollection)
  const { data } = useLiveSuspenseQuery((q) =>
    q
      .from({ palette: collection })
      .where(({ palette }) => eq(palette.visibility, 'public'))
      .orderBy(({ palette }) => palette.createdAt, 'asc'),
  )

  const handleDelete = async (paletteId: string) => {
    collection.delete(paletteId)
  }

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
        <div key={palette.id}>
          <Link to="/palette-generator/{-$paletteId}" params={{ paletteId: palette.id }}>
            <Palette.Root initialState={hydratePaletteState(palette)}>
              <Palette.Swatches orientation={'horizontal'} rounded="xxLarge">
                {({ color }) => (
                  <Color.Provider color={color}>
                    <Color.Swatch />
                  </Color.Provider>
                )}
              </Palette.Swatches>
            </Palette.Root>
          </Link>
          <Button onClick={() => handleDelete(palette.id)}>Delete</Button>
        </div>
      ))}
      {children}
    </div>
  )
}
