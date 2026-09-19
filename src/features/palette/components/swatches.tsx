import { cva } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

import type { Color } from '#/features/color/color.types.ts'
import type { ValueType } from '../types/value'
import type { VariantProps } from 'class-variance-authority'

const paletteListVariants = cva(
  'relative grid size-full min-h-min min-w-0 grow auto-cols-fr overflow-hidden outline outline-border',
  {
    variants: {
      orientation: {
        horizontal: 'grid-flow-col',
        vertical: 'grid-flow-row',
      },
      rounded: {
        none: 'rounded-none',
        small: 'rounded-sm',
        medium: 'rounded-md',
        large: 'rounded-lg',
        xlarge: 'rounded-xl',
        xxlarge: 'rounded-2xl',
        xxxlarge: 'rounded-3xl',
      },
    },
    defaultVariants: { orientation: 'vertical', rounded: 'none' },
  },
)

type PaletteSwatchesProps = Omit<React.ComponentProps<'ul'>, 'children'> &
  VariantProps<typeof paletteListVariants> & {
    children: (props: { color: Color; valueType?: ValueType }) => React.ReactNode
  }

export const PaletteSwatches = ({
  rounded,
  orientation,
  className,
  children,
  ref,
  ...props
}: PaletteSwatchesProps) => {
  const {
    state: { colors, valueType },
  } = usePalette()

  return (
    <ul
      className={cn(paletteListVariants({ orientation, rounded }), className)}
      ref={ref}
      {...props}
    >
      {colors.map((color) => (
        <li key={color.id} className="">
          {children({ color, valueType })}
        </li>
      ))}
    </ul>
  )
}
