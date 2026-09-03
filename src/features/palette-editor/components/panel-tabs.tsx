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
      <TabsTab value="generator">Generator</TabsTab>
      <TabsTab value="accessibility">Accessibility</TabsTab>
      <TabsIndicator />
      {children}
    </TabsList>
  )
}
