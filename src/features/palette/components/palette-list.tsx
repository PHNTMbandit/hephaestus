import { cn } from 'dawn-ui-react'
import { Reorder, type HTMLMotionProps } from 'motion/react'
import React from 'react'
import { type Colour as ColourType } from '#/features/colour/colour.types.ts'
import { Colour } from '#/features/colour/components/colour'
import { useMediaQuery } from '#/hooks/use-media-query.tsx'
import { usePalette } from '../hooks/use-palette'
import { Palette } from './palette'

type PaletteListProps = HTMLMotionProps<'ul'>

export const PaletteList = ({ className, ref, ...props }: PaletteListProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const {
    state: { colours },
    dispatch,
  } = usePalette()

  const handleReorder = (newColours: ColourType[]) => {
    dispatch({ type: 'REORDER', payload: { newColours } })
  }

  return (
    <Reorder.Group
      axis={isDesktop ? 'x' : 'y'}
      {...props}
      values={colours}
      onReorder={handleReorder}
      ref={ref}
      className={cn(
        'grid h-2/3 w-full grow auto-cols-fr grid-flow-row border-b border-border xl:grid-flow-col',
        className,
      )}
    >
      {colours.map((colour) => (
        <Reorder.Item
          key={colour.id}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          value={colour}
          className="min-w-0 grow origin-center"
          whileTap={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.651)',
            scale: 1.05,
            zIndex: 10,
          }}
          transition={{
            boxShadow: { duration: 0.3 },
          }}
        >
          <Colour.Provider colour={colour}>
            <Colour.Block className="hover:cursor-grab active:cursor-grabbing">
              {!isDragging && (
                <>
                  <Palette.Add />
                  <Colour.Actions>
                    <Palette.Delete />
                    <Colour.Copy />
                    <Palette.Lock />
                  </Colour.Actions>
                </>
              )}
              <Colour.Footer>
                <Colour.Value />
                <Colour.Name />
              </Colour.Footer>
            </Colour.Block>
          </Colour.Provider>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
