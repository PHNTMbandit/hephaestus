import { XIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { useColor } from '#/features/color/components/color-provider.tsx'
import { getForeground } from '#/features/color/utils/style'
import { usePalette } from '../hooks/use-palette'

type PaletteDeleteProps = React.ComponentProps<'button'>

export const PaletteDelete = ({ className, children, ref, ...props }: PaletteDeleteProps) => {
  const { color } = useColor()
  const { state, dispatch } = usePalette()
  const colors = state.colors ?? []
  const chromaColor = chroma(color.value)
  const isDark = chromaColor.luminance() < 0.5

  const handleClick = () => {
    dispatch({
      type: 'REMOVE_AT',
      payload: { index: colors.findIndex((c) => c.id === color.id) },
    })
  }

  return (
    <Button
      style={{
        backgroundColor: isDark ? chromaColor.brighten(0.5).hex() : chromaColor.darken(0.5).hex(),
        color: getForeground(color.value),
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
