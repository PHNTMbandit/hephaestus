import { useDbClient, useLiveQuery, eq } from '@tanstack/react-db'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { paletteCollection } from '../db/palette-collection'
import { usePalette } from '../hooks/use-palette'

const descriptionVariants = cva('', {
  variants: {
    size: {
      small: 'style-text-prose--1',
      medium: 'style-text-prose-0',
      large: 'style-text-prose-1',
      xlarge: 'style-text-prose-2',
      xxlarge: 'style-text-prose-3',
    },
    variant: {
      default: 'text-on-surface',
      variant: 'text-on-surface-variant',
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
})

type PaletteDescriptionProps = React.ComponentProps<'p'> & VariantProps<typeof descriptionVariants>

export const PaletteDescription = ({
  size,
  variant,
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
    <p className={cn(descriptionVariants({ size, variant }), className)} ref={ref} {...props}>
      {children}
      {data && <span>{data.description}</span>}
    </p>
  )
}
