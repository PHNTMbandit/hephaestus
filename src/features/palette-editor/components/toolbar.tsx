import { cn } from 'dawn-ui-react'

type PaletteEditorToolbarProps = React.ComponentProps<'div'>

export const PaletteEditorToolbar = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorToolbarProps) => {
  return (
    <div
      className={cn(
        'flex min-h-2xl w-full flex-wrap items-center justify-between gap-sm border-b border-border bg-surface-background px-2xs',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
