import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
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

  return (
    <p className={cn(descriptionVariants({ size, variant }), className)} ref={ref} {...props}>
      {children}
      {<span>{state.description}</span>}
    </p>
  )
}
