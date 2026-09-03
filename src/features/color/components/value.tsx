import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { getForeground } from '../utils/style'
import { useColor } from './provider'

const colorValueVariants = cva('w-full', {
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

type ColorValueProps = React.ComponentProps<'span'> & VariantProps<typeof colorValueVariants>

export const ColorValue = ({ size, className, children, ref, ...props }: ColorValueProps) => {
  const { color } = useColor()

  return (
    <span
      style={{
        color: getForeground(color.value),
        opacity: 0.8,
      }}
      className={cn(colorValueVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
