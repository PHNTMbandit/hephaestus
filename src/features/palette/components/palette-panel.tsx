import { cn, Tabs } from 'dawn-ui-react'

type PalettePanelProps = React.ComponentProps<'div'>

export const PalettePanel = ({ className, children, ref, ...props }: PalettePanelProps) => {
  return (
    <Tabs
      variant={'underline'}
      className={cn(
        'flex w-[550px] flex-col items-center justify-between space-y-3xs! border-r border-border bg-surface-background',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Tabs>
  )
}
