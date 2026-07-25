import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { getForeground } from '../utils/accessibility'
import { colourNameQueryOptions } from '../utils/queries'
import { useColour } from './colour-provider'

const colourNameVariants = cva('capitalize', {
  variants: {
    size: {
      small: 'style-text-strong--1',
      medium: 'style-text-strong-0',
      large: 'style-text-strong-1',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

type ColourNameProps = React.ComponentProps<'span'> & VariantProps<typeof colourNameVariants>

export const ColourName = ({ size, className, children, ref, ...props }: ColourNameProps) => {
  const { colour } = useColour()
  const { data, isPending } = useQuery(colourNameQueryOptions(colour.value))

  return (
    <span
      style={{
        color: getForeground(colour.value),
      }}
      className={cn(colourNameVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
      {isPending ? <CircleNotchIcon weight="bold" className="animate-spin xl:mx-auto" /> : data}
    </span>
  )
}
