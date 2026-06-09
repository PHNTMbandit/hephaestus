import { cn, Input } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteBaseColourProps = React.ComponentProps<typeof Input>

export const PaletteBaseColour = ({
  className,
  children,
  ref,
  ...props
}: PaletteBaseColourProps) => {
  const { state, dispatch } = usePalette()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_BASE_COLOUR', payload: { baseColour: event.target.value } })
  }

  return (
    <Input
      type="color"
      defaultValue={state.baseColour}
      onChange={handleChange}
      value={state.baseColour}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
    </Input>
  )
}
