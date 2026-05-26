import { XIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { useColour } from '#/features/colour/components/colour-provider.tsx'
import { usePalette } from '../hooks/use-palette'

type PaletteDeleteProps = React.ComponentProps<'button'>

export const PaletteDelete = ({ className, children, ref, ...props }: PaletteDeleteProps) => {
  const { colour } = useColour()
  const { state, dispatch } = usePalette()
  const chromaColour = chroma(colour.value)
  const isDark = chromaColour.luminance() < 0.5

  const handleClick = () => {
    dispatch({
      type: 'REMOVE_AT',
      payload: { index: state.colours.findIndex((c) => c.id === colour.id) },
    })
  }

  return (
    <Button
      style={{
        backgroundColor: isDark ? chromaColour.brighten(0.5).hex() : chromaColour.darken(0.5).hex(),
        color: isDark ? 'white' : 'black',
      }}
      onClick={handleClick}
      tone="neutral"
      variant={'ghost'}
      size="iconMedium"
      className={cn(
        'opacity-0 transition-all not-hover:bg-transparent! group-hover:opacity-100',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <XIcon weight="bold" className="shrink-0" />
    </Button>
  )
}
