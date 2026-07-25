import { cn } from 'dawn-ui-react'

type ColourActionsProps = React.ComponentProps<'div'>

export const ColourActions = ({ className, children, ref, ...props }: ColourActionsProps) => {
  return (
    <div className={cn('flex items-center justify-end gap-3xs', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
