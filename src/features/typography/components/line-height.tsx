import { cn, NumberField } from 'dawn-ui-react'
import { useTypography } from './provider'

type TypographyLineHeightProps = React.ComponentProps<typeof NumberField>

export const TypographyLineHeight = ({
  className,
  children,
  ref,
  ...props
}: TypographyLineHeightProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (value: unknown) => {
    dispatch({ type: 'SET_LINE_HEIGHT', payload: { lineHeight: value as number } })
  }

  return (
    <NumberField
      min={0}
      step={0.05}
      value={state.lineHeight}
      onValueChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
    </NumberField>
  )
}
