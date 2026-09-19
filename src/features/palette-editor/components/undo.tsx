import { ArrowUUpLeftIcon } from '@phosphor-icons/react'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorUndoProps = React.ComponentProps<'button'>

export const PaletteEditorUndo = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorUndoProps) => {
  const { state, dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'UNDO' })
  }

  useHotkey('Control+Z', () => handleClick())

  return (
    <Button
      disabled={state.undoActions.length === 0}
      size="iconMedium"
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      <ArrowUUpLeftIcon weight="bold" />
      {children}
    </Button>
  )
}
