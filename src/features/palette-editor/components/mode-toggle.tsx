import { EyeIcon, ListIcon } from '@phosphor-icons/react/dist/ssr'
import { cn, Tabs, TabsIndicator, TabsList, TabsTab } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorModeToggleProps = React.ComponentProps<typeof Tabs>

export const PaletteEditorModeToggle = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorModeToggleProps) => {
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
