import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Button, cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteGenerateProps = React.ComponentProps<'button'>

export const PaletteGenerate = ({ className, children, ref, ...props }: PaletteGenerateProps) => {
  const { dispatch } = usePalette()
  useHotkey('Space', () => {
    dispatch({ type: 'GENERATE' })
  })

  const handleClick = () => {
    dispatch({ type: 'GENERATE' })
  }

  return (
    <Button className={cn('w-full', className)} ref={ref} {...props} onClick={handleClick}>
      <ArrowsClockwiseIcon weight="bold" /> {children}
      Randomize
    </Button>
  )
}
