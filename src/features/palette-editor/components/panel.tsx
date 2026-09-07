import { cn, Tabs } from 'dawn-ui-react'

type PaletteEditorPanelProps = React.ComponentProps<'div'>

export const PaletteEditorPanel = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPanelProps) => {
  return (
    <Tabs
      variant={'underline'}
      className={cn(
        'flex flex-col items-center justify-between space-y-3xs! border-r border-border bg-surface-background',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Tabs>
  )
}
