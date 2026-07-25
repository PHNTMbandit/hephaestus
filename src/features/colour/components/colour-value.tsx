import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { getForeground } from '../utils/accessibility'
import { useColour } from './colour-provider'

const colourValueVariants = cva('w-full', {
  variants: {
    size: {
      small: 'style-text-prose--1',
      medium: 'style-text-prose-0',
      large: 'style-text-prose-1',
    },
  },
  defaultVariants: {
    size: 'small',
  },
})

type ColourValueProps = React.ComponentProps<'span'> & VariantProps<typeof colourValueVariants>

export const ColourValue = ({ size, className, children, ref, ...props }: ColourValueProps) => {
  const { colour } = useColour()

  return (
    <span
      style={{
        color: getForeground(colour.value),
        opacity: 0.8,
      }}
      className={cn(colourValueVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
