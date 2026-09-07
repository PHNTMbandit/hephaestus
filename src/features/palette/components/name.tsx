import { eq, useDbClient, useLiveQuery } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { paletteCollection } from '../db/palette-collection'
import { usePalette } from '../hooks/use-palette'

type PaletteNameProps = React.ComponentProps<'span'>

export const PaletteName = ({ className, children, ref, ...props }: PaletteNameProps) => {
  const { state } = usePalette()
  const collection = useDbClient().collection(paletteCollection)
  const { data } = useLiveQuery((q) =>
    q
      .from({ data: collection })
      .where(({ data }) => eq(data.id, state.id))
      .select(({ data }) => ({ name: data.name }))
      .findOne(),
  )

  return (
    <span className={cn('style-text-default-0', className)} ref={ref} {...props}>
      {children}
      {data && <span>{data.name}</span>}
    </span>
  )
}
