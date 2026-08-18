import { cn, Label } from 'dawn-ui-react'
import { useContrastChecker } from '../hooks/use-contrast-checker'
import { ContrastColorPicker } from './contrast-color-picker'
import { ContrastSwap } from './contrast-swap'

import type { Color } from 'chroma-js'

type ContrastColorInputsProps = React.ComponentProps<'div'>

export const ContrastColorInputs = ({
  className,
  children,
  ref,
  ...props
}: ContrastColorInputsProps) => {
  const { state, dispatch } = useContrastChecker()

  const handleForegroundValueChange = (color: Color) => {
    dispatch({ type: 'SET_FOREGROUND_COLOR', payload: { color: color.hex() } })
  }

  const handleBackgroundValueChange = (color: Color) => {
    dispatch({ type: 'SET_BACKGROUND_COLOR', payload: { color: color.hex() } })
  }

  return (
    <div className={cn('flex flex-col gap-sm', className)} ref={ref} {...props}>
      {children}
      <div className="flex flex-col gap-sm">
        <Label size="large">Foreground</Label>
        <ContrastColorPicker
          value={state.foregroundColor}
          onValueChange={handleForegroundValueChange}
        />
      </div>
      <div className="flex justify-center">
        <ContrastSwap />
      </div>
      <div className="flex flex-col gap-sm">
        <Label size="large">Background</Label>
        <ContrastColorPicker
          value={state.backgroundColor}
          onValueChange={handleBackgroundValueChange}
        />
      </div>
    </div>
  )
}
