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
import { typeScales } from '../constants/scale'
import { useTypography } from './typography-provider'

import type { TypeScale } from '../types/type-scale'

type TypographyScaleProps = React.ComponentProps<'button'>

export const TypographyScale = ({ className, children, ref, ...props }: TypographyScaleProps) => {
  const { state, dispatch } = useTypography()

  const handleChange = (value: unknown) => {
    dispatch({ type: 'SET_SCALE', payload: { scale: value as TypeScale } })
  }

  return (
    <Select value={state.scale} onValueChange={handleChange}>
      <SelectTrigger className={cn('', className)} ref={ref} {...props}>
        {children}
        <SelectValue>{(value: TypeScale) => <>{value.name}</>}</SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          <SelectGroup>
            {Object.entries(typeScales).map(([_key, scale]) => (
              <SelectItem key={scale.id} value={scale}>
                {scale.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
