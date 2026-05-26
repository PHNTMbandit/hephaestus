import { PlusIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette.ts'
import { generateInbetweenColour } from '#/features/palette/palette.utils.ts'
import { useColour } from '../../colour/components/colour-provider'

type PaletteAddProps = React.ComponentProps<'button'>

export const PaletteAdd = ({ className, children, ref, ...props }: PaletteAddProps) => {
  const { colour } = useColour()
  const { state, dispatch } = usePalette()
  const currentColourIndex = state.colours.findIndex((c) => c.id === colour.id)
  const inbetweenColour = generateInbetweenColour(state.colours, currentColourIndex)

  if (currentColourIndex === 0) {
    return null
  }

  const handleClick = () => {
    dispatch({
      type: 'ADD_AT',
      payload: { index: currentColourIndex - 1, colour: inbetweenColour },
    })
  }

  return (
    <Button
      style={{
        backgroundColor: inbetweenColour.value,
      }}
      onClick={handleClick}
      size="small"
      variant={'elevated'}
      className={cn(
        'absolute -top-sm left-1/2 w-2/3 -translate-x-1/2 scale-95 opacity-0 hover:scale-100 hover:opacity-100 xl:top-1/2 xl:left-0 xl:h-3/4! xl:w-1/3 xl:max-w-1/6 xl:-translate-y-1/2',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <PlusIcon
        style={{
          color: chroma(inbetweenColour.value).luminance() > 0.5 ? 'black' : 'white',
        }}
        className="size-2/3! min-h-xs min-w-xs shrink-0"
        weight="bold"
      />
    </Button>
  )
}
