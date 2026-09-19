import { LockSimpleIcon, LockSimpleOpenIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { Button, cn } from 'dawn-ui-react'
import { useColor } from '#/features/color/components/provider'
import { getForeground } from '#/features/color/utils/style'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorLockColorProps = React.ComponentProps<'button'>

export const PaletteEditorLockColor = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorLockColorProps) => {
  const { color } = useColor()
  const { dispatch } = usePalette()
  const chromaColor = chroma(color.value)
  const isDark = chromaColor.luminance() < 0.5

  const handleClick = () => {
    if (color.locked) {
      dispatch({ type: 'UNLOCK', payload: { id: color.id } })
    } else {
      dispatch({ type: 'LOCK', payload: { id: color.id } })
    }
  }

  return (
    <Button
      style={{
        backgroundColor: isDark ? chromaColor.brighten(0.5).hex() : chromaColor.darken(0.5).hex(),
        color: getForeground(color.value),
      }}
      tone="neutral"
      variant={'ghost'}
      size="iconMedium"
      className={cn(
        'opacity-0 transition-all not-hover:bg-transparent! group-hover:opacity-100',
        color.locked && 'opacity-100',
        className,
      )}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
      {color.locked ? <LockSimpleIcon weight="fill" /> : <LockSimpleOpenIcon weight="bold" />}
    </Button>
  )
}
