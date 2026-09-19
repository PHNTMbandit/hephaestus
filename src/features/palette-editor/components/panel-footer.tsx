import { cn } from 'dawn-ui-react'

type PaletteEditorPanelFooterProps = React.ComponentProps<'div'>

export const PaletteEditorPanelFooter = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPanelFooterProps) => {
  return (
    <div
      className={cn('w-full border-t border-border px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
