import { cn, Skeleton } from 'dawn-ui-react'
import { Palette } from './palette'

type PaletteGridSkeletonProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  length?: number
}

export const PaletteGridSkeleton = ({
  length = 10,
  className,
  ref,
  ...props
}: PaletteGridSkeletonProps) => {
  const items = Array.from({ length }, (_, i) => ({ id: `skeleton-${i}` }))

  return (
    <Palette.Grid items={items} className={cn('', className)} ref={ref} {...props}>
      {(palette) => <Skeleton key={palette.id} />}
    </Palette.Grid>
  )
}
