import { CheckIcon, SparkleIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'
import { getForeground } from '#/features/color/utils/style'
import { getContrastAlgorithm } from '#/features/contrast-checker/algorithms'
import { usePaletteAccessibility } from '../hooks/use-palette-accessibility'

type PaletteAccessibilityRecommendationProps = React.ComponentProps<'div'>

export const PaletteAccessibilityRecommendation = ({
  className,
  children,
  ref,
  ...props
}: PaletteAccessibilityRecommendationProps) => {
  const { background, setForeground } = usePaletteAccessibility()

  if (!background) {
    return null
  }

  const recommended = getForeground(background.value)
  const algorithm = getContrastAlgorithm('WCAG2')
  const score = algorithm.calculate(recommended, background.value)

  return (
    <div className={cn('flex flex-col gap-2xs', className)} ref={ref} {...props}>
      {children}
      <div className="flex items-center gap-2xs">
        <SparkleIcon weight="bold" />
        <span className="style-text-strong-0">Recommended foreground</span>
      </div>
      <div
        className="flex items-center gap-sm rounded-lg border border-border p-sm"
        style={{ backgroundColor: background.value }}
      >
        <span className="style-text-strong-3" style={{ color: recommended }}>
          Aa
        </span>
        <div className="flex flex-1 flex-col">
          <span className="style-text-default-0 tabular-nums" style={{ color: recommended }}>
            {recommended}
          </span>
          <span className="style-text-default--1 tabular-nums" style={{ color: recommended }}>
            {algorithm.formatScore(score)}
          </span>
        </div>
        <Button
          size="small"
          onClick={() =>
            setForeground({ id: crypto.randomUUID(), value: recommended, locked: false })
          }
        >
          <CheckIcon weight="bold" />
          Apply
        </Button>
      </div>
    </div>
  )
}
