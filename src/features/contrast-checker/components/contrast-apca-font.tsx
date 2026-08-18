import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge, cn } from 'dawn-ui-react'
import { lookupApcaFont } from '../constants/apca-font-matrix'
import { FONT_WEIGHTS } from '../constants/font'
import { useContrastChecker } from '../hooks/use-contrast-checker'
import { ContrastStatusIcon } from './contrast-status-icon'

type ContrastApcaFontProps = React.ComponentProps<'div'>

export const ContrastApcaFont = ({ className, children, ref, ...props }: ContrastApcaFontProps) => {
  const { state } = useContrastChecker()

  if (state.contrastMethod !== 'APCA') return null

  const result = lookupApcaFont(state.contrastScore, state.fontWeight)
  const passes = result.status === 'ok' && state.fontSize >= result.minFontSize
  const status = passes ? 'pass' : result.status === 'prohibited' ? 'fail' : 'partial'
  const fontWeightLabel =
    FONT_WEIGHTS.find((option) => option.value === state.fontWeight)?.label || ''
  const statusLabel =
    result.status === 'ok'
      ? `${state.fontWeight} · ${fontWeightLabel} usable at ${result.minFontSize}px and up`
      : result.status === 'non-text'
        ? 'Sufficient for non-text elements only'
        : 'Contrast too low for text'

  return (
    <div
      className={cn('flex flex-col gap-sm border-b border-border pb-md', className)}
      ref={ref}
      {...props}
    >
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
      <div
        className="flex w-full items-center rounded-xl border border-border p-md"
        style={{ backgroundColor: state.backgroundColor, color: state.foregroundColor }}
      >
        <p
          style={{ fontSize: `${state.fontSize}px`, fontWeight: state.fontWeight, lineHeight: 1.3 }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  )
}
