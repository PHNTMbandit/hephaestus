import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { useColor } from './color-provider'

const colorBlockVariants = cva(
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

type ColorBlockProps = React.ComponentProps<'div'> & VariantProps<typeof colorBlockVariants>

export const ColorBlock = ({ size, className, children, ref, ...props }: ColorBlockProps) => {
  const { color } = useColor()

  return (
    <div
      style={{
        backgroundColor: color.value,
      }}
      className={cn(colorBlockVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
