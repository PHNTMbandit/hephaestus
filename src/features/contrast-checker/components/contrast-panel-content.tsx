import { cn } from 'dawn-ui-react'

type ContrastPanelContentProps = React.ComponentProps<'div'>

export const ContrastPanelContent = ({
  className,
  children,
  ref,
  ...props
}: ContrastPanelContentProps) => {
  return (
    <div
      className={cn('flex w-full grow flex-col gap-lg overflow-y-auto px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
