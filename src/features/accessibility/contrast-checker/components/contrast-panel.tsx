import { cn } from 'dawn-ui-react'

type ContrastPanelProps = React.ComponentProps<'div'>

export const ContrastPanel = ({ className, children, ref, ...props }: ContrastPanelProps) => {
  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col items-center justify-between overflow-auto border-b border-border bg-surface-background lg:w-[420px] lg:border-r lg:border-b-0',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
