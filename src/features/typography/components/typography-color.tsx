import { cn, Input } from 'dawn-ui-react'
import { useTypography } from './typography-provider'

type TypographyColorProps = React.ComponentProps<typeof Input>

export const TypographyColor = ({ className, ref, ...props }: TypographyColorProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch({ type: 'SET_COLOR', payload: { color: value as string } })
  }

  return (
    <Input
      key={state.color}
      type="color"
      defaultValue={state.color}
      value={state.color}
      onChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    />
  )
}
