import { ArrowUUpRightIcon } from '@phosphor-icons/react'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorRedoProps = React.ComponentProps<'button'>

export const PaletteEditorRedo = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorRedoProps) => {
  const { state, dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'REDO' })
  }

  useHotkey('Control+Y', () => handleClick())

  return (
    <Button
      disabled={state.redoActions.length === 0}
      size="iconMedium"
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <ArrowUUpRightIcon weight="bold" />
      {children}
    </Button>
  )
}
