import { cn, Input } from 'dawn-ui-react'
import { useTypography } from './typography-provider'

type TypographyColourProps = React.ComponentProps<typeof Input>

export const TypographyColour = ({ className, ref, ...props }: TypographyColourProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch({ type: 'SET_COLOUR', payload: { colour: value as string } })
  }

  return (
    <Input
      key={state.colour}
      type="color"
      defaultValue={state.colour}
      value={state.colour}
      onChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    />
  )
}
