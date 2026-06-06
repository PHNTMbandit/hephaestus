import { cn, NumberField } from 'dawn-ui-react'
import { useTypography } from './typography-provider'

type TypographyFontSizeProps = React.ComponentProps<typeof NumberField>

export const TypographyFontSize = ({
  className,
  children,
  ref,
  ...props
}: TypographyFontSizeProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (value: unknown) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: { fontSize: value as number } })
  }

  return (
    <NumberField
      min={10}
      max={100}
      step={0.5}
      value={state.fontSize}
      onValueChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
    </NumberField>
  )
}
