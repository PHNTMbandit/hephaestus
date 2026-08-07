import { cn, Input } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteBaseColorProps = React.ComponentProps<typeof Input>

export const PaletteBaseColor = ({ className, children, ref, ...props }: PaletteBaseColorProps) => {
  const { state, dispatch } = usePalette()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_BASE_COLOR', payload: { baseColor: event.target.value } })
  }

  return (
    <Input
      type="color"
      defaultValue={state.baseColor}
      onChange={handleChange}
      value={state.baseColor}
      className={cn('ml-auto xl:ml-0', className)}
      ref={ref}
      variant={'secondary'}
      {...props}
    >
      {children}
    </Input>
  )
}
