import { CircleHalfIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { CONTRAST_ALGORITHMS } from '#/features/accessibility/algorithms'
import { ContrastAlgorithmScore } from '#/features/accessibility/contrast-checker/components/contrast-algorithm-score'
import { usePaletteAccessibility } from '#/features/palette-editor/hooks/use-palette-accessibility'

import type { ContrastMethod } from '#/features/accessibility/types/methods'

type PaletteEditorAccessibilityScoresProps = React.ComponentProps<'div'>

export const PaletteEditorAccessibilityScores = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorAccessibilityScoresProps) => {
  const { foreground, background } = usePaletteAccessibility()

  if (!foreground || !background) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-lg', className)} ref={ref} {...props}>
      {children}
      {Object.keys(CONTRAST_ALGORITHMS).map((method) => (
        <ContrastAlgorithmScore
          key={method}
          method={method as ContrastMethod}
          foreground={foreground.value}
          background={background.value}
        />
      ))}
      <Link
        to="/contrast-checker"
        search={{ foreground: foreground.value, background: background.value }}
      >
        <Button className={'w-full'}>
          Open in
          <span className="flex items-center gap-3xs style-text-strong-0">
            <CircleHalfIcon /> Contrast Checker
          </span>
        </Button>
      </Link>
    </div>
  )
}
