import { cn } from 'dawn-ui-react'

type ContrastPanelProps = React.ComponentProps<'div'>

export const ContrastPanel = ({ className, children, ref, ...props }: ContrastPanelProps) => {
  return (
    <div
      className={cn(
        'flex w-[420px] shrink-0 flex-col items-center justify-between border-r border-border bg-surface-background',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
