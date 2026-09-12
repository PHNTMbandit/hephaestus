import { cn } from 'dawn-ui-react'
import { Palette } from '#/features/palette/components/palette'
import { hydratePaletteState } from '#/features/palette/utils/state'
import { ExplorePaletteCard } from './palette-card'

import type { Palette as PaletteType } from '#/features/palette/db/palette-collection'

type ExploreDashboardProps = React.ComponentProps<'div'> & {
  data: PaletteType[]
}

export const ExploreDashboard = ({
  className,
  children,
  ref,
  data,
  ...props
}: ExploreDashboardProps) => {
  return (
    <Palette.Grid className={cn('min-h-0 flex-1', className)} ref={ref} {...props}>
      {data?.map((palette) => (
        <ExplorePaletteCard key={palette.id} palette={hydratePaletteState(palette)} />
      ))}
      {children}
    </Palette.Grid>
  )
}
