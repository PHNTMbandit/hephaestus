import { cn } from 'dawn-ui-react'

type PaletteEditorPanelContentProps = React.ComponentProps<'div'>

export const PaletteEditorPanelContent = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPanelContentProps) => {
  return (
    <div
      className={cn(
        'flex w-full grow flex-col items-center justify-start overflow-y-auto',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
