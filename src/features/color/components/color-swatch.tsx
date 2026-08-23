import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { useColor } from './color-provider'

const colorSwatchVariants = cva(
  'group relative flex size-full flex-col items-start justify-between gap-md',
  {
    variants: {
      size: {
        small: 'p-sm',
        medium: 'p-md',
        large: 'p-lg',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
)

type ColorSwatchProps = React.ComponentProps<'div'> & VariantProps<typeof colorSwatchVariants>

export const ColorSwatch = ({ size, className, children, ref, ...props }: ColorSwatchProps) => {
  const { color } = useColor()

  return (
    <div
      style={{
        backgroundColor: color.value,
      }}
      className={cn(colorSwatchVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
