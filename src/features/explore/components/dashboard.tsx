import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { explorePalettes } from '#/features/palette/db/live-queries'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { ExplorePaletteCard } from './palette-card'

type ExploreDashboardProps = Omit<React.ComponentProps<'div'>, 'children'>

export const ExploreDashboard = ({ className, ref, ...props }: ExploreDashboardProps) => {
  const { data } = useLiveSuspenseQuery(explorePalettes())

  return (
    <Palette.Grid items={data} className={cn('min-h-0 flex-1', className)} ref={ref} {...props}>
      {(palette) => <ExplorePaletteCard key={palette.id} palette={hydratePaletteState(palette)} />}
    </Palette.Grid>
  )
}
