import { CheckIcon } from '@phosphor-icons/react'
import { cn, Label } from 'dawn-ui-react'
import { getForeground } from '#/features/color/utils/style'
import { usePalette } from '../hooks/use-palette'
import { usePaletteAccessibility } from '../hooks/use-palette-accessibility'

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
      <Label>{label ?? (role === 'foreground' ? 'Foreground' : 'Background')}</Label>
      <div className="flex flex-wrap gap-2xs">
        {Array.from(uniqueColors).map((color) => {
          const isSelected = selected && color.value === selected.value

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => select(color)}
              aria-label={color.value}
              aria-pressed={isSelected}
              className={cn(
                'flex size-lg items-center justify-center rounded-md border border-border transition-colors hover:cursor-pointer',
                isSelected && 'border-2',
              )}
              style={{
                backgroundColor: color.value,
                borderColor: isSelected ? getForeground(color.value) : undefined,
                color: getForeground(color.value),
              }}
            >
              {isSelected && <CheckIcon weight="bold" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
