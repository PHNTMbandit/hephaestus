import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { Button, cn, Meter, MeterIndicator, MeterTrack } from 'dawn-ui-react'
import { getContrastAlgorithm } from '../algorithms'
import { useContrastChecker } from '../hooks/use-contrast-checker'
import { ContrastStatusIcon } from './contrast-status-icon'

type ContrastSummaryProps = React.ComponentProps<'div'>

export const ContrastSummary = ({ className, children, ref, ...props }: ContrastSummaryProps) => {
  const { state } = useContrastChecker()
  const algorithm = getContrastAlgorithm(state.contrastMethod)
  const score = algorithm.formatScore(state.contrastScore)
  const progress = Math.round(algorithm.normalizeScore(state.contrastScore) * 100)
  const checks = algorithm
    .requirements(state.contrastScore)
    .flatMap((requirement) => requirement.checks)
  const passedCount = checks.filter((check) => check.passes).length
  const status = passedCount === checks.length ? 'pass' : passedCount === 0 ? 'fail' : 'partial'

  return (
    <div className={cn('flex flex-col gap-md', className)} ref={ref} {...props}>
      {children}
      <span className="style-text-default-0 text-on-surface-variant">{algorithm.label}</span>
      <div
        className={cn(
          'flex items-center gap-sm',
          status === 'pass'
            ? 'text-success-default'
            : status === 'partial'
              ? 'text-warning-default'
              : 'text-error-default',
        )}
      >
        <ContrastStatusIcon status={status} size="large" weight="fill" />
        <span className="style-text-strong-3">
          {status === 'pass' ? 'Pass' : status === 'partial' ? 'Partial' : 'Fail'}
        </span>
      </div>
      <span className="style-text-strong-5 tabular-nums">{score}</span>
      <Meter
        tone={status === 'pass' ? 'success' : status === 'partial' ? 'warning' : 'error'}
        value={progress}
      >
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <div>
        <p className="style-text-prose--1 text-on-surface-variant">{algorithm.description}</p>
        <div className="flex items-start gap-md">
          {algorithm.references.map((reference) => (
            <Link key={reference.url} to={reference.url} target="_blank" rel="noopener noreferrer">
              <Button size={'small'} tone="accent" variant={'link'}>
                {reference.label}
                <ArrowSquareOutIcon weight="bold" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
