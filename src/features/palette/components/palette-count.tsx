import { cn, NumberField } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteCountProps = React.ComponentProps<typeof NumberField>

export const PaletteCount = ({ className, children, ref, ...props }: PaletteCountProps) => {
  const { state, dispatch } = usePalette()

  const handleChange = (_value: number | null, e: any) => {
    if (e.direction === 1) {
      dispatch({ type: 'ADD' })
    } else if (e.direction === -1 && state.colours.length > 1) {
      const lastColour = state.colours[state.colours.length - 1]
      if (lastColour) {
        dispatch({ type: 'REMOVE' })
      }
    }
  }

  return (
    <NumberField
      min={1}
      max={state.limit}
      onValueChange={handleChange}
      value={state.colours.length}
      className={cn('hidden xl:block', className)}
      ref={ref}
      {...props}
    >
      {children}
    </NumberField>
  )
}
