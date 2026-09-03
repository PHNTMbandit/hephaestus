import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { useDebouncedState } from '@tanstack/react-pacer'
import { useQuery } from '@tanstack/react-query'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import React from 'react'
import { colorNameQueryOptions } from '../utils/queries'
import { getForeground } from '../utils/style'
import { useColor } from './provider'

const colorNameVariants = cva('capitalize', {
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

type ColorNameProps = React.ComponentProps<'span'> & VariantProps<typeof colorNameVariants>

export const ColorName = ({ size, className, children, ref, ...props }: ColorNameProps) => {
  const { color } = useColor()
  const [debouncedColorValue, setDebouncedColorValue] = useDebouncedState<string | null>(null, {
    wait: 800,
  })
  const isDebouncing = debouncedColorValue !== color.value
  const { data, isFetching } = useQuery({
    ...colorNameQueryOptions(debouncedColorValue ?? color.value),
    enabled: !isDebouncing,
  })

  React.useEffect(() => {
    setDebouncedColorValue(color.value)
  }, [color.value, setDebouncedColorValue])

  return (
    <span
      style={{
        color: getForeground(color.value),
      }}
      className={cn(colorNameVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      {children}
      {isDebouncing || isFetching ? (
        <CircleNotchIcon weight="bold" className="animate-spin xl:mx-auto" />
      ) : (
        data
      )}
    </span>
  )
}
