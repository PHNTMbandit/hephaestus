import { SparkleIcon } from '@phosphor-icons/react'
import { cn } from 'dawn-ui-react'
import { ContrastCombinationCard } from '#/features/accessibility/contrast-checker/components/contrast-combination-card'
import { getCompatiblePalettes } from '#/features/color/utils/style'
import { usePaletteAccessibility } from '#/features/palette-editor/hooks/use-palette-accessibility'
import { usePalette } from '#/features/palette/hooks/use-palette'

import type { Color } from '#/features/color/color.types'

type PaletteAccessibilityRecommendationProps = React.ComponentProps<'div'>

export const PaletteAccessibilityRecommendation = ({
  className,
  children,
  ref,
  ...props
}: PaletteAccessibilityRecommendationProps) => {
  const { setForeground, setBackground, foreground, background } = usePaletteAccessibility()
  const {
    state: { colors, valueType },
  } = usePalette()
  const compatiblePalettes = getCompatiblePalettes(colors)

  const isSelected = (buttonForeground: Color, buttonBackground: Color) => {
    return (
      buttonForeground.value === foreground.value && buttonBackground.value === background.value
    )
  }

  const handleClick = (nextForeground: Color, nextBackground: Color) => {
    setForeground(nextForeground)
    setBackground(nextBackground)
  }

  return (
    <div className={cn('flex flex-col gap-sm', className)} ref={ref} {...props}>
      {children}
      <div className="flex items-center gap-2xs">
        <SparkleIcon weight="bold" />
        <span className="style-text-strong-0">Recommended combinations</span>
      </div>
      <div className="grid grid-cols-2 gap-2xs">
        {compatiblePalettes.map(({ foreground, background }) => (
          <ContrastCombinationCard
            key={`${foreground.value}-${background.value}`}
            foreground={foreground.value}
            background={background.value}
            selected={isSelected(foreground, background)}
            formatValue={valueType.displayColor}
            onClick={() => handleClick(foreground, background)}
          />
        ))}
        {compatiblePalettes.length === 0 && (
          <p className="col-span-2 style-text-prose--1 text-error-muted">
            No compatible combinations found.
          </p>
        )}
      </div>
    </div>
  )
}
