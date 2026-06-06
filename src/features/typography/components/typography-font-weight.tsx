import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr'
import {
  cn,
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from 'dawn-ui-react'
import { fontWeights } from '../typography.constants'
import { useTypography } from './typography-provider'

import type { FontWeight } from '../types/font-weight'

type TypographyFontWeightProps = React.ComponentProps<'button'>

export const TypographyFontWeight = ({
  className,
  children,
  ref,
  ...props
}: TypographyFontWeightProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (value: unknown) => {
    const selectedWeight = fontWeights[value as keyof typeof fontWeights]

    if (!selectedWeight) {
      return
    }

    dispatch({ type: 'SET_FONT_WEIGHT', payload: { fontWeight: selectedWeight as FontWeight } })
  }

  return (
    <Select value={String(state.fontWeight.weight)} onValueChange={handleChange}>
      <SelectTrigger className={cn('', className)} ref={ref} {...props}>
        {children}
        <SelectValue>
          {(value: string) => (
            <span className="capitalize">
              {fontWeights[value as keyof typeof fontWeights]?.name ?? value}
            </span>
          )}
        </SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          <SelectGroup>
            {Object.entries(fontWeights).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
