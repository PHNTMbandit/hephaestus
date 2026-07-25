import { cn } from 'dawn-ui-react'

type ColourHeaderProps = React.ComponentProps<'div'>

export const ColourHeader = ({ className, children, ref, ...props }: ColourHeaderProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-md', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
