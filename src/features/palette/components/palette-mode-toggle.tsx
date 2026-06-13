import { cn, Tabs, TabsIndicator, TabsList, TabsTab } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteModeToggleProps = React.ComponentProps<typeof Tabs>

export const PaletteModeToggle = ({
  className,
  children,
  ref,
  ...props
}: PaletteModeToggleProps) => {
  const { state, dispatch } = usePalette()

  const handleModeChange = (value: string) => {
    dispatch({ type: 'SET_MODE', payload: { mode: value as 'list' | 'preview' } })
  }

  return (
    <Tabs
      value={state.mode}
      onValueChange={handleModeChange}
      variant={'ghost'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <TabsList>
        <TabsTab value="list">List</TabsTab>
        <TabsTab value="preview">Preview</TabsTab>
        <TabsIndicator />
      </TabsList>
      {children}
    </Tabs>
  )
}
