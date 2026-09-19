import { cn, TabsIndicator, TabsList, TabsTab } from 'dawn-ui-react'

type PaletteEditorPanelTabsProps = React.ComponentProps<'div'>

export const PaletteEditorPanelTabs = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPanelTabsProps) => {
  return (
    <TabsList className={cn('', className)} ref={ref} {...props}>
      <TabsTab value="controls">Controls</TabsTab>
      <TabsTab value="accessibility">Accessibility</TabsTab>
      <TabsTab value="preview">Preview</TabsTab>
      <TabsIndicator />
      {children}
    </TabsList>
  )
}
