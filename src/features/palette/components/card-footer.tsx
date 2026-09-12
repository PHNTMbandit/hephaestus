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
      data-slot="card-footer"
      className={cn('flex h-2xl items-center justify-between gap-3xs px-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
