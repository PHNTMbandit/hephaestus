import { CircleNotchIcon } from '@phosphor-icons/react'
import { cn } from 'dawn-ui-react'

type PendingProps = React.ComponentProps<'div'>

export const Pending = ({ className, children, ref, ...props }: PendingProps) => {
  return (
    <div
      className={cn('flex size-full flex-col items-center justify-center', className)}
      ref={ref}
      {...props}
    >
      {children}
      <CircleNotchIcon className="size-xl animate-spin text-on-surface-variant" />
    </div>
  )
}
