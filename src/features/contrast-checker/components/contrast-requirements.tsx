import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge, Button, cn } from 'dawn-ui-react'
import { getContrastAlgorithm } from '../algorithms'
import { useContrastChecker } from '../hooks/use-contrast-checker'
import { ContrastStatusIcon } from './contrast-status-icon'

import type { ContrastRequirementPreview } from '../types/algorithm'

type ContrastRequirementsProps = React.ComponentProps<'div'>

const PREVIEW_SIZES: Record<ContrastRequirementPreview, number | null> = {
  body: 16,
  large: 24,
  heading: 32,
  'non-text': null,
}

const renderPreview = (
  preview: ContrastRequirementPreview,
  foreground: string,
  background: string,
) => {
  switch (preview) {
    case 'body':
      return (
        <p style={{ fontSize: 16, lineHeight: 1.4 }}>
          The quick brown fox jumps over the lazy dog. 0123456789
        </p>
      )
    case 'large':
      return <p style={{ fontSize: 24, lineHeight: 1.3 }}>Large text sample</p>
    case 'heading':
      return <p style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>Headlines &amp; bold</p>
    case 'non-text':
      return (
        <div className="flex flex-wrap items-center gap-sm">
          <Button style={{ backgroundColor: foreground, color: background }}>Solid button</Button>
          <Button
            variant="outline"
            style={{ borderColor: foreground, color: foreground, backgroundColor: background }}
          >
            Outline button
          </Button>
          <span className="size-lg rounded-full" style={{ backgroundColor: foreground }} />
          <span className="size-lg rounded-sm border-2" style={{ borderColor: foreground }} />
        </div>
      )
  }
}

export const ContrastRequirements = ({
  className,
  children,
  ref,
  ...props
}: ContrastRequirementsProps) => {
  const { state } = useContrastChecker()
  const foreground = state.foregroundColor
  const background = state.backgroundColor
  const requirements = getContrastAlgorithm(state.contrastMethod).requirements(state.contrastScore)

  return (
    <div
      className={cn('flex h-full flex-col gap-sm divide-y divide-border', className)}
      ref={ref}
      {...props}
    >
      {children}

      {requirements.map((requirement) => {
        const passedCount = requirement.checks.filter((check) => check.passes).length
        const status =
          passedCount === requirement.checks.length
            ? 'pass'
            : passedCount === 0
              ? 'fail'
              : 'partial'

        return (
          <div key={requirement.id} className="flex flex-col gap-sm not-last:pb-md">
            <div className="flex flex-wrap items-center justify-between gap-sm">
              <div className="flex items-center gap-xs">
                <ContrastStatusIcon status={status} />
                <span className="style-text-strong-0 text-on-surface">{requirement.label}</span>
                <span className="style-text-default--1 text-on-surface-variant">
                  {PREVIEW_SIZES[requirement.preview]}px
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2xs">
                {requirement.checks.map((check) => (
                  <Badge
                    key={check.label}
                    tone={check.passes ? 'success' : 'error'}
                    variant={'soft'}
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
            <div
              className="flex min-h-lg w-full items-center rounded-xl border border-border p-md"
              style={{ backgroundColor: background, color: foreground }}
            >
              {renderPreview(requirement.preview, foreground, background)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
