import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { Badge, cn } from 'dawn-ui-react'

import type { ConformanceCheck } from '#/features/accessibility/types/algorithm'

type ConformanceBadgeProps = React.ComponentProps<typeof Badge> & {
  check: ConformanceCheck
}

export const ConformanceBadge = ({ check, className, ...props }: ConformanceBadgeProps) => {
  return (
    <Badge
      variant={'soft'}
      tone={check.passes ? 'success' : 'error'}
      className={cn('', className)}
      {...props}
    >
      {check.passes ? <CheckCircleIcon weight="duotone" /> : <XCircleIcon weight="duotone" />}
      {check.label} · {check.threshold}
    </Badge>
  )
}
