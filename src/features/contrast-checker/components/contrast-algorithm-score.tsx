import { cn, Meter, MeterIndicator, MeterTrack } from 'dawn-ui-react'
import { getContrastAlgorithm } from '../algorithms'
import { getConformanceStatus } from '../utils/conformance'
import { ConformanceBadge } from './conformance-badge'

import type { ContrastMethod } from '../types/methods'

type ContrastAlgorithmScoreProps = React.ComponentProps<'div'> & {
  foreground: string
  background: string
  method: ContrastMethod
}

export const ContrastAlgorithmScore = ({
  foreground,
  background,
  method,
  className,
  children,
  ref,
  ...props
}: ContrastAlgorithmScoreProps) => {
  const algorithm = getContrastAlgorithm(method)
  const score = algorithm.calculate(foreground, background)
  const requirements = algorithm.requirements(score)
  const status = getConformanceStatus(requirements.flatMap((requirement) => requirement.checks))
  const progress = Math.round(algorithm.normalizeScore(score) * 100)

  return (
    <div className={cn('flex flex-col gap-xs', className)} ref={ref} {...props}>
      {children}
      <div className="flex flex-col gap-3xs">
        <span className="style-text-default--1 text-on-surface-variant">{algorithm.label}</span>
        <span className="style-text-strong-1 tabular-nums">{algorithm.formatScore(score)}</span>
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
                <ConformanceBadge key={check.label} check={check} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
