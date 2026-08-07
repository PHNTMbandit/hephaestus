import { cn } from 'dawn-ui-react'

type ColorHeaderProps = React.ComponentProps<'div'>

export const ColorHeader = ({ className, children, ref, ...props }: ColorHeaderProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-md', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
