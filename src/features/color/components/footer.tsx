import { cn } from 'dawn-ui-react'

type ColorFooterProps = React.ComponentProps<'div'>

export const ColorFooter = ({ className, children, ref, ...props }: ColorFooterProps) => {
  return (
    <div className={cn('flex w-full flex-col items-end gap-md', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
