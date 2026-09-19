import { cn } from 'dawn-ui-react'

type PaletteEditorToolbarGroupProps = React.ComponentProps<'div'>

export const PaletteEditorToolbarGroup = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorToolbarGroupProps) => {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-center gap-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
