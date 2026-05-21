import { cn } from 'dawn-ui-react'

type ColourActionsProps = React.ComponentProps<'div'>

export const ColourActions = ({ className, children, ref, ...props }: ColourActionsProps) => {
  return (
    <div
      className={cn(
        'group col-start-2 row-start-1 flex size-full h-fit items-center justify-center gap-3xs place-self-center xl:flex-col xl:justify-end',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
