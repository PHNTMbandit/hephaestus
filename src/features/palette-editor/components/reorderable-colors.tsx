import { cn } from 'dawn-ui-react'
import { Reorder, type HTMLMotionProps } from 'motion/react'
import React from 'react'
import { usePalette } from '#/features/palette/hooks/use-palette'

import type { Color } from '#/features/color/color.types.ts'
import type { ValueType } from '#/features/palette/types/value'

type PaletteReorderableListProps = Omit<HTMLMotionProps<'ul'>, 'children'> & {
  children: (props: { color: Color; isDragging: boolean; valueType?: ValueType }) => React.ReactNode
}

export const PaletteReorderableList = ({
  children,
  className,
  ref,
  ...props
}: PaletteReorderableListProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const {
    state: { colors, valueType },
    dispatch,
  } = usePalette()

  const handleReorder = (newColors: Color[]) => {
    dispatch({ type: 'REORDER', payload: { newColors } })
  }

  return (
    <Reorder.Group
      axis={'y'}
      {...props}
      values={colors}
      onReorder={handleReorder}
      ref={ref}
      className={cn('grid w-full grow auto-cols-fr grid-flow-row overflow-y-auto', className)}
    >
      {colors.map((color) => (
        <Reorder.Item
          key={color.id}
          drag={color.locked ? false : 'y'}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          value={color}
          className="min-w-0 grow origin-center hover:cursor-grab active:cursor-grabbing"
          whileTap={{
            zIndex: 10,
          }}
        >
          {children({ color, isDragging, valueType })}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
