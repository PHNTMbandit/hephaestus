import { cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteGradientProps = React.ComponentProps<'div'>

export const PaletteGradient = ({ className, children, ref, ...props }: PaletteGradientProps) => {
  const { state } = usePalette()
  const gradientStops = state.colors
    .map((color, index) => `${color.value} ${(index / (state.colors.length - 1)) * 100}%`)
    .join(', ')

  return (
    <div className={cn('size-full overflow-auto', className)} ref={ref} {...props}>
      {children}
      <div
        className="size-full"
        style={{
          background: `linear-gradient(180deg, ${gradientStops})`,
        }}
      />
    </div>
  )
}
