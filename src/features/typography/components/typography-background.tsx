import { cn, Input } from 'dawn-ui-react'
import { useTypography } from './typography-provider'

type TypographyBackgroundProps = React.ComponentProps<typeof Input>

export const TypographyBackground = ({ className, ref, ...props }: TypographyBackgroundProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch({ type: 'SET_BACKGROUND', payload: { background: value as string } })
  }

  return (
    <Input
      key={state.background}
      type="color"
      defaultValue={state.background}
      value={state.background}
      onChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    />
  )
}
