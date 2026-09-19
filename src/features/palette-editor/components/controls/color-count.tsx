import { cn, NumberField } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorControlsColorCountProps = React.ComponentProps<typeof NumberField>

export const PaletteEditorControlsColorCount = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorControlsColorCountProps) => {
  const { state, dispatch } = usePalette()

  const handleChange = (_value: number | null, e: any) => {
    if (e.direction === 1) {
      dispatch({ type: 'ADD' })
    } else if (e.direction === -1 && state.colors.length > 1) {
      const lastColor = state.colors[state.colors.length - 1]
      if (lastColor) {
        dispatch({ type: 'REMOVE' })
      }
    }
  }

  return (
    <NumberField
      min={1}
      max={state.limit}
      onValueChange={handleChange}
      value={state.colors.length}
      className={cn('w-full', className)}
      ref={ref}
      {...props}
    >
      {children}
      Colors
    </NumberField>
  )
}
