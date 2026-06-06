import { cn, NumberField } from 'dawn-ui-react'
import { useTypography } from './typography-provider'

type TypographyLetterSpacingProps = React.ComponentProps<typeof NumberField>

export const TypographyLetterSpacing = ({
  className,
  children,
  ref,
  ...props
}: TypographyLetterSpacingProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (value: unknown) => {
    dispatch({ type: 'SET_LETTER_SPACING', payload: { letterSpacing: value as number } })
  }

  return (
    <NumberField
      min={0}
      step={0.002}
      value={state.letterSpacing}
      onValueChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
    </NumberField>
  )
}
