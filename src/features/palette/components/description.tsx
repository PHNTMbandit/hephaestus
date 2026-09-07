import { useDbClient, useLiveQuery, eq } from '@tanstack/react-db'
import { cn } from 'dawn-ui-react'
import { paletteCollection } from '../db/palette-collection'
import { usePalette } from '../hooks/use-palette'

type PaletteDescriptionProps = React.ComponentProps<'p'>

export const PaletteDescription = ({
  className,
  children,
  ref,
  ...props
}: PaletteDescriptionProps) => {
  const { state } = usePalette()
  const collection = useDbClient().collection(paletteCollection)
  const { data } = useLiveQuery((q) =>
    q
      .from({ data: collection })
      .where(({ data }) => eq(data.id, state.id))
      .select(({ data }) => ({ description: data.description }))
      .findOne(),
  )

  return (
    <p className={cn('text-on-surface-variant', className)} ref={ref} {...props}>
      {children}
      {data && <span>{data.description}</span>}
    </p>
  )
}
