import { cn, TabsIndicator, TabsList, TabsTab } from 'dawn-ui-react'

type PalettePanelTabsProps = React.ComponentProps<'div'>

export const PalettePanelTabs = ({ className, children, ref, ...props }: PalettePanelTabsProps) => {
  return (
    <TabsList className={cn('', className)} ref={ref} {...props}>
      <TabsTab value="generator">Generator</TabsTab>
      <TabsTab value="accessibility">Accessibility</TabsTab>
      <TabsIndicator />
      {children}
    </TabsList>
  )
}
