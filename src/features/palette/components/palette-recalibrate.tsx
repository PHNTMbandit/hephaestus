import { useHotkey } from '@tanstack/react-hotkeys'
import { Button, cn, Kbd } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteRecalibrateProps = React.ComponentProps<'button'>

export const PaletteRecalibrate = ({
  className,
  children,
  ref,
  ...props
}: PaletteRecalibrateProps) => {
  const { dispatch } = usePalette()
  useHotkey('Control+Space', () => {
    dispatch({ type: 'RECALIBRATE' })
  })

  const handleClick = () => {
    dispatch({ type: 'RECALIBRATE' })
  }

  return (
    <Button
      variant={'outline'}
      className={cn('', className)}
      ref={ref}
      {...props}
      onClick={handleClick}
    >
      Recalibrate
      <Kbd>CTRL + Space</Kbd>
      {children}
    </Button>
  )
}
