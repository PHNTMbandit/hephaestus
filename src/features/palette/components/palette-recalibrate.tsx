import { BroomIcon } from '@phosphor-icons/react/dist/ssr'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteRecalibrateProps = React.ComponentProps<'button'>

export const PaletteRecalibrate = ({
  className,
  children,
  ref,
  ...props
}: PaletteRecalibrateProps) => {
  const { dispatch } = usePalette()

  const handleClick = () => {
    dispatch({ type: 'RECALIBRATE' })
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
      <span className="hidden xl:block">Reset</span>
      {children}
    </Button>
  )
}
