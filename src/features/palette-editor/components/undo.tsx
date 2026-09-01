import { ArrowUUpLeftIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteUndoProps = React.ComponentProps<'button'>

export const PaletteUndo = ({ className, children, ref, ...props }: PaletteUndoProps) => {
  const { state, dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'UNDO' })
  }

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
