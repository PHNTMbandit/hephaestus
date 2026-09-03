import { cn } from 'dawn-ui-react'

type PaletteEditorPanelHeaderProps = React.ComponentProps<'div'>

export const PaletteEditorPanelHeader = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPanelHeaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-xs border-b border-border',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
