import { cn } from 'dawn-ui-react'

type PaletteCardFooterProps = React.ComponentProps<'div'>

export const PaletteCardFooter = ({
  className,
  children,
  ref,
  ...props
}: PaletteCardFooterProps) => {
  return (
    <div
      className={cn('flex items-center justify-between gap-sm px-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
