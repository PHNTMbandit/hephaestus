import { CheckCircleIcon, MinusIcon, ProhibitIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge, cn } from 'dawn-ui-react'
import { lookupApcaFont } from '#/features/accessibility/constants/apca-font-matrix'
import { FONT_WEIGHTS } from '#/features/accessibility/constants/font'
import { useContrastChecker } from '../hooks/use-contrast-checker'
import { ContrastStatusIcon } from './contrast-status-icon'

type ContrastApcaMatrixProps = React.ComponentProps<'div'>

const WEIGHT_ROW_STYLES = {
  valid: 'border-success-default bg-success-container text-success-on-container',
  partial: 'border-error-default bg-error-container text-error-on-container',
}

export const ContrastApcaMatrix = ({
  className,
  children,
  ref,
  ...props
}: ContrastApcaMatrixProps) => {
  const { state } = useContrastChecker()

  if (state.contrastMethod !== 'APCA') return null

  const result = lookupApcaFont(state.contrastScore, state.fontWeight)
  const passes = result.status === 'ok' && state.fontSize >= result.minFontSize
  const status = passes ? 'pass' : result.status === 'prohibited' ? 'fail' : 'fail'
  const statusLabel =
    result.status === 'ok'
      ? `Usable at ${result.minFontSize}px and up`
      : result.status === 'non-text'
        ? 'Sufficient for non-text elements only'
        : 'Contrast too low for text'

  return (
    <div className={cn('flex flex-col gap-sm', className)} ref={ref} {...props}>
      {children}
      <div className="flex flex-wrap items-center justify-between gap-sm">
        <div className="flex items-center gap-xs">
          <ContrastStatusIcon status={status} />
          <span className="style-text-strong-0 text-on-surface">{statusLabel}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2xs">
          <Badge tone={passes ? 'success' : 'error'} variant="soft">
            {passes ? <CheckCircleIcon weight="duotone" /> : <XCircleIcon weight="duotone" />}
            {passes ? 'Pass' : 'Fail'}
          </Badge>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-2xs sm:grid-cols-3">
        {FONT_WEIGHTS.map((weight) => {
          const result = lookupApcaFont(state.contrastScore, weight.value)
          const isCurrent = weight.value === state.fontWeight
          const isValid =
            isCurrent && result.status === 'ok' && state.fontSize >= result.minFontSize
          const isPartial =
            isCurrent && result.status === 'ok' && state.fontSize < result.minFontSize

          return (
            <li
              key={weight.value}
              className={cn(
                'flex items-center justify-between gap-sm rounded-lg border border-border px-sm py-2xs transition-colors',
                isValid && WEIGHT_ROW_STYLES.valid,
                isPartial && WEIGHT_ROW_STYLES.partial,
              )}
            >
              <span className={cn('style-text-default--1')}>
                {weight.value} · {weight.label}
              </span>
              {result.status === 'ok' ? (
                <span className={cn('style-text-strong-0 tabular-nums')}>
                  {result.minFontSize}px
                </span>
              ) : result.status === 'non-text' ? (
                <span
                  className={cn('flex items-center gap-2xs')}
                  title="Sufficient for non-text elements only"
                >
                  <MinusIcon weight="bold" />
                  <span className="style-text-default--1">Non-text</span>
                </span>
              ) : (
                <span className={cn('flex items-center gap-2xs')} title="Contrast too low for text">
                  <ProhibitIcon weight="bold" />
                  <span className="style-text-default--1">Fail</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
