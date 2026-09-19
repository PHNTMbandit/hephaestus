import { CheckCircleIcon, WarningCircleIcon, XCircleIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'

import type { Icon } from '@phosphor-icons/react'

export type ContrastStatus = 'pass' | 'partial' | 'fail'

const contrastStatusIconVariants = cva('', {
  variants: {
    status: {
      pass: 'text-success-default',
      partial: 'text-warning-default',
      fail: 'text-error-default',
    },
    size: {
      medium: 'size-md',
      large: 'size-lg',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const STATUS_ICONS: Record<ContrastStatus, Icon> = {
  pass: CheckCircleIcon,
  partial: WarningCircleIcon,
  fail: XCircleIcon,
}

type ContrastStatusIconProps = Omit<React.ComponentProps<Icon>, 'size' | 'weight'> &
  VariantProps<typeof contrastStatusIconVariants> & {
    status: ContrastStatus
    weight?: React.ComponentProps<Icon>['weight']
  }

export const ContrastStatusIcon = ({
  status,
  size,
  weight = 'duotone',
  className,
  ...props
}: ContrastStatusIconProps) => {
  const StatusIcon = STATUS_ICONS[status]

  return (
    <StatusIcon
      weight={weight}
      className={cn(contrastStatusIconVariants({ status, size }), className)}
      {...props}
    />
  )
}
