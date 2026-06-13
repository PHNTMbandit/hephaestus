import { cn } from 'dawn-ui-react'
import { Reorder, type HTMLMotionProps } from 'motion/react'
import React from 'react'
import { useMediaQuery } from '#/hooks/use-media-query.tsx'
import { usePalette } from '../hooks/use-palette'

import type { Colour } from '#/features/colour/colour.types.ts'
import type { ValueType } from '../types/value'

type PaletteReorderableListProps = Omit<HTMLMotionProps<'ul'>, 'children'> & {
  children: (props: {
    colour: Colour
    isDragging: boolean
    valueType?: ValueType
  }) => React.ReactNode
}

export const PaletteReorderableList = ({
  children,
  className,
  ref,
  ...props
}: PaletteReorderableListProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const {
    state: { colours, valueType },
    dispatch,
  } = usePalette()

  const handleReorder = (newColours: Colour[]) => {
    dispatch({ type: 'REORDER', payload: { newColours } })
  }

  return (
    <Reorder.Group
      axis={isDesktop ? 'x' : 'y'}
      {...props}
      values={colours}
      onReorder={handleReorder}
      ref={ref}
      className={cn('grid w-full grow auto-cols-fr grid-flow-row xl:grid-flow-col', className)}
    >
      {colours.map((colour) => (
        <Reorder.Item
          key={colour.id}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          value={colour}
          className="min-w-0 grow origin-center hover:cursor-grab active:cursor-grabbing"
          whileTap={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.651)',
            scale: 1.05,
            zIndex: 10,
          }}
          transition={{
            boxShadow: { duration: 0.3 },
          }}
        >
          {children({ colour, isDragging, valueType })}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
