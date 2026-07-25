import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { useColour } from './colour-provider'

const colourBlockVariants = cva(
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

type ColourBlockProps = React.ComponentProps<'div'> & VariantProps<typeof colourBlockVariants>

export const ColourBlock = ({ size, className, children, ref, ...props }: ColourBlockProps) => {
  const { colour } = useColour()

  return (
    <div
      style={{
        backgroundColor: colour.value,
      }}
      className={cn(colourBlockVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
