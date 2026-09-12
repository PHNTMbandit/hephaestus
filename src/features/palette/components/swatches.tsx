import { cva } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

import type { Color } from '#/features/color/color.types.ts'
import type { ValueType } from '../types/value'
import type { VariantProps } from 'class-variance-authority'

const paletteListVariants = cva(
  'relative grid size-full min-h-0 min-w-0 grow auto-cols-fr overflow-hidden',
  {
    variants: {
      orientation: {
        horizontal: 'grid-flow-col',
        vertical: 'grid-flow-row',
      },
    },
    defaultVariants: { orientation: 'vertical' },
  },
)

type PaletteSwatchesProps = Omit<React.ComponentProps<'ul'>, 'children'> &
  VariantProps<typeof paletteListVariants> & {
    children: (props: { color: Color; valueType?: ValueType }) => React.ReactNode
  }

export const PaletteSwatches = ({
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
    <ul className={cn(paletteListVariants({ orientation }), className)} ref={ref} {...props}>
      {colors.map((color) => (
        <li key={color.id} className="">
          {children({ color, valueType })}
        </li>
      ))}
    </ul>
  )
}
