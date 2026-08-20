import { cn } from 'dawn-ui-react'

type ContrastPanelContentProps = React.ComponentProps<'div'>

export const ContrastPanelContent = ({
  className,
  children,
  ref,
  ...props
}: ContrastPanelContentProps) => {
  return (
    <div className={cn('w-full grow overflow-y-auto pt-xs', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
