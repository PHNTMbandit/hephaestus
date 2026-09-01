import { cn, Label } from 'dawn-ui-react'
import { ColorSwatchButton } from '#/features/color/components/color-swatch-button'
import { usePaletteAccessibility } from '#/features/palette-editor/hooks/use-palette-accessibility'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { PaletteAccessibilityCopy } from './copy'

type PaletteAccessibilitySwatchesProps = React.ComponentProps<'div'> & {
  role: 'foreground' | 'background'
  label?: string
}

export const PaletteAccessibilitySwatches = ({
  role,
  label,
  className,
  ref,
  ...props
}: PaletteAccessibilitySwatchesProps) => {
  const {
    state: { colors },
  } = usePalette()
  const { foreground, background, setForeground, setBackground } = usePaletteAccessibility()
  const uniqueColors = Array.from(new Map(colors.map((color) => [color.value, color])).values())

  const selected = role === 'foreground' ? foreground : background
  const select = role === 'foreground' ? setForeground : setBackground

  return (
    <div className={cn('flex flex-col gap-2xs', className)} ref={ref} {...props}>
      <div className="flex items-center justify-between gap-2xs">
        <Label>{label ?? (role === 'foreground' ? 'Foreground' : 'Background')}</Label>
        {selected && (
          <PaletteAccessibilityCopy
            value={selected.value}
            aria-label={`Copy ${role} colour ${selected.value}`}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2xs">
        {uniqueColors.map((color) => (
          <ColorSwatchButton
            key={color.id}
            color={color.value}
            selected={!!selected && color.value === selected.value}
            aria-label={color.value}
            onClick={() => select(color)}
          />
        ))}
      </div>
    </div>
  )
}
