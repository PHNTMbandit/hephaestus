import { ArrowUUpRightIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteRedoProps = React.ComponentProps<'button'>

export const PaletteRedo = ({ className, children, ref, ...props }: PaletteRedoProps) => {
  const { state, dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'REDO' })
  }

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
