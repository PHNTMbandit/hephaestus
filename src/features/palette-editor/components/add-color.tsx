import { PlusIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette.ts'
import { generateInbetweenColor } from '#/features/palette/utils'
import { useColor } from '../../color/components/color-provider'

type PaletteAddProps = React.ComponentProps<'button'>

export const PaletteAdd = ({ className, children, ref, ...props }: PaletteAddProps) => {
  const { color } = useColor()
  const { state, dispatch } = usePalette()
  const colors = state.colors ?? []
  const currentColorIndex = colors.findIndex((c) => c.id === color.id)
  const inbetweenColor = generateInbetweenColor(colors, currentColorIndex)

  if (currentColorIndex === 0) {
    return null
  }

  const handleClick = () => {
    dispatch({
      type: 'ADD_AT',
      payload: { index: currentColorIndex - 1, color: inbetweenColor },
    })
  }

  return (
    <Button
      style={{
        backgroundColor: inbetweenColor.value,
      }}
      onClick={handleClick}
      size="small"
      variant={'elevated'}
      className={cn(
        'absolute -top-sm left-1/2 w-2/3 -translate-x-1/2 scale-95 opacity-0 hover:scale-100 hover:opacity-100',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <PlusIcon
        style={{
          color: chroma(inbetweenColor.value).luminance() > 0.5 ? 'black' : 'white',
        }}
        className="size-2/3! min-h-xs min-w-xs shrink-0"
        weight="bold"
      />
    </Button>
  )
}
