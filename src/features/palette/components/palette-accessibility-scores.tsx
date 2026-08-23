import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge, cn, Meter, MeterIndicator, MeterTrack } from 'dawn-ui-react'
import { CONTRAST_ALGORITHMS, getContrastAlgorithm } from '#/features/contrast-checker/algorithms'
import { usePaletteAccessibility } from '../hooks/use-palette-accessibility'

type PaletteAccessibilityScoresProps = React.ComponentProps<'div'>

export const PaletteAccessibilityScores = ({
  className,
  children,
  ref,
  ...props
}: PaletteAccessibilityScoresProps) => {
  const { foreground, background } = usePaletteAccessibility()

  if (!foreground || !background) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-lg', className)} ref={ref} {...props}>
      {children}
      {Object.entries(CONTRAST_ALGORITHMS).map(([key]) => {
        const algorithm = getContrastAlgorithm(key as keyof typeof CONTRAST_ALGORITHMS)
        const score = algorithm.calculate(foreground.value, background.value)
        const requirements = algorithm.requirements(score)
        const passedCount = requirements.reduce(
          (acc, requirement) => acc + requirement.checks.filter((check) => check.passes).length,
          0,
        )
        const checks = requirements.flatMap((requirement) => requirement.checks)
        const status =
          passedCount === checks.length ? 'pass' : passedCount === 0 ? 'fail' : 'partial'
        const progress = Math.round(algorithm.normalizeScore(score) * 100)

        return (
          <div key={key} className="flex flex-col gap-xs px-2xs">
            <div className="flex flex-col gap-3xs">
              <span className="style-text-default--1 text-on-surface-variant">
                {algorithm.label}
              </span>
              <span className="style-text-strong-1 tabular-nums">
                {algorithm.formatScore(score)}
              </span>
            </div>
            <Meter
              tone={status === 'pass' ? 'success' : status === 'partial' ? 'warning' : 'error'}
              value={progress}
              size="small"
            >
              <MeterTrack>
                <MeterIndicator />
              </MeterTrack>
            </Meter>
            <div className="flex flex-col gap-2xs">
              {requirements.map((requirement) => (
                <div key={requirement.id} className="flex items-center justify-between gap-sm">
                  <span className="style-text-default--1 text-on-surface-variant">
                    {requirement.label}
                  </span>
                  <div className="flex flex-wrap justify-end gap-2xs">
                    {requirement.checks.map((check) => (
                      <Badge
                        key={check.label}
                        variant={'soft'}
                        tone={check.passes ? 'success' : 'error'}
                      >
                        {check.passes ? (
                          <CheckCircleIcon weight="duotone" />
                        ) : (
                          <XCircleIcon weight="duotone" />
                        )}
                        {check.label} · {check.threshold}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
