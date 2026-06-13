import { cva } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

import type { Colour } from '#/features/colour/colour.types.ts'
import type { ValueType } from '../types/value'
import type { VariantProps } from 'class-variance-authority'

const paletteListVariants = cva(
  'relative grid size-full min-h-0 min-w-0 grow auto-cols-fr overflow-hidden',
  {
    variants: {
      rounded: {
        none: '',
        xSmall: 'rounded-xs',
        small: 'rounded-sm',
        medium: 'rounded-md',
        large: 'rounded-lg',
        xLarge: 'rounded-xl',
        xxLarge: 'rounded-2xl',
        xxxLarge: 'rounded-3xl',
        full: 'rounded-full',
      },
      orientation: {
        horizontal: 'grid-flow-col',
        vertical: 'grid-flow-row',
      },
    },
    defaultVariants: { orientation: 'horizontal', rounded: 'none' },
  },
)

type PaletteListProps = Omit<React.ComponentProps<'ul'>, 'children'> &
  VariantProps<typeof paletteListVariants> & {
    children: (props: { colour: Colour; valueType?: ValueType }) => React.ReactNode
  }

export const PaletteList = ({
  orientation,
  rounded,
  className,
  children,
  ref,
  ...props
}: PaletteListProps) => {
  const {
    state: { colours, valueType },
  } = usePalette()

  return (
    <ul
      className={cn(paletteListVariants({ orientation, rounded }), className)}
      ref={ref}
      {...props}
    >
      {colours.map((colour) => (
        <li key={colour.id} className="">
          {children({ colour, valueType })}
        </li>
      ))}
    </ul>
  )
}
