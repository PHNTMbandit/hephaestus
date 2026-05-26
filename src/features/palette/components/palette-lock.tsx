import { LockSimpleIcon, LockSimpleOpenIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { useColour } from '#/features/colour/components/colour-provider.tsx'
import { usePalette } from '../hooks/use-palette'

type PaletteLockProps = React.ComponentProps<'button'>

export const PaletteLock = ({ className, children, ref, ...props }: PaletteLockProps) => {
  const { colour } = useColour()
  const { dispatch } = usePalette()
  const chromaColour = chroma(colour.value)
  const isDark = chromaColour.luminance() < 0.5

  const handleClick = () => {
    if (colour.locked) {
      dispatch({ type: 'UNLOCK', payload: { id: colour.id } })
    } else {
      dispatch({ type: 'LOCK', payload: { id: colour.id } })
    }
  }

  return (
    <Button
      style={{
        backgroundColor: isDark ? chromaColour.brighten(0.5).hex() : chromaColour.darken(0.5).hex(),
        color: isDark ? 'white' : 'black',
      }}
      tone="neutral"
      variant={'ghost'}
      size="iconMedium"
      className={cn(
        'opacity-0 transition-all not-hover:bg-transparent! group-hover:opacity-100',
        colour.locked && 'opacity-100',
        className,
      )}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
      {colour.locked ? <LockSimpleIcon weight="fill" /> : <LockSimpleOpenIcon weight="bold" />}
    </Button>
  )
}
