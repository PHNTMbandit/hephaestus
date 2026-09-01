import { useDbClient, useLiveSuspenseQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { paletteCollection } from '#/features/palette/db/collection'

type DashboardProps = React.ComponentProps<'div'>

export const Dashboard = ({ className, children, ref, ...props }: DashboardProps) => {
  const collection = useDbClient().collection(paletteCollection)
  const { data } = useLiveSuspenseQuery((q) =>
    q.from({ palette: collection }).orderBy(({ palette }) => palette.createdAt, 'asc'),
  )

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
          <div className="flex items-center justify-between gap-2xs">
            <Link to="/palette-generator/{-$projectId}" params={{ projectId: palette.id }}>
              Open
            </Link>
            <Palette.DeletePalette paletteId={palette.id} />
          </div>
        </Palette.Card>
      ))}
      {children}
    </div>
  )
}
