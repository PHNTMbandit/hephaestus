import { cn } from 'dawn-ui-react'

type ColourFooterProps = React.ComponentProps<'div'>

export const ColourFooter = ({ className, children, ref, ...props }: ColourFooterProps) => {
  return (
    <div
      className={cn('col-start-1 grid h-fit w-full grid-rows-2 gap-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
