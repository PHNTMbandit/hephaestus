import { cn } from 'dawn-ui-react'

type ColourFooterProps = React.ComponentProps<'div'>

export const ColourFooter = ({ className, children, ref, ...props }: ColourFooterProps) => {
  return (
    <div className={cn('flex w-full flex-col items-end gap-md', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
