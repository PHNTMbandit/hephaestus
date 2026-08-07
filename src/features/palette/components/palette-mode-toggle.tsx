import { EyeIcon, ListIcon } from '@phosphor-icons/react/dist/ssr'
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
      variant={'ghost'}
      value={state.mode}
      onValueChange={handleModeChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <TabsList>
        <TabsTab value="list">
          <ListIcon weight="bold" />
        </TabsTab>
        <TabsTab value="preview">
          <EyeIcon weight="bold" />
        </TabsTab>
        <TabsIndicator />
      </TabsList>
      {children}
    </Tabs>
  )
}
