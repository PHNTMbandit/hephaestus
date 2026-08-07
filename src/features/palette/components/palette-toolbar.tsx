import { cn } from 'dawn-ui-react'

type PaletteToolbarProps = React.ComponentProps<'div'>

export const PaletteToolbar = ({ className, children, ref, ...props }: PaletteToolbarProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-between gap-md border-b border-border bg-surface-background py-2xs pr-2xs pl-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
