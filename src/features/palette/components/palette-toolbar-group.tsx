import { cn } from 'dawn-ui-react'

type PaletteToolbarGroupProps = React.ComponentProps<'div'>

export const PaletteToolbarGroup = ({
  className,
  children,
  ref,
  ...props
}: PaletteToolbarGroupProps) => {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-center gap-3xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
