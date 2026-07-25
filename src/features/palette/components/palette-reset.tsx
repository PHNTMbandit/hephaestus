import { BroomIcon } from '@phosphor-icons/react/dist/ssr'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteResetProps = React.ComponentProps<'button'>

export const PaletteReset = ({ className, children, ref, ...props }: PaletteResetProps) => {
  const { dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <Button
      variant={'ghost'}
      tone="neutral"
      className={cn('', className)}
      ref={ref}
      {...props}
      onClick={handleClick}
    >
      <BroomIcon weight="bold" />
      {children}
    </Button>
  )
}
