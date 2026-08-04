import { cn } from 'dawn-ui-react'

type ColorActionsProps = React.ComponentProps<'div'>

export const ColorActions = ({ className, children, ref, ...props }: ColorActionsProps) => {
  return (
    <div
      className={cn('flex items-center justify-center gap-3xs self-center', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
