import { CaretUpDownIcon } from '@phosphor-icons/react'
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
import { usePalette } from '../hooks/use-palette'
import { valueTypesList } from '../palette.utils'

type PaletteValueSelectProps = React.ComponentProps<typeof SelectTrigger>

export const PaletteValueSelect = ({
  className,
  children,
  ref,
  ...props
}: PaletteValueSelectProps) => {
  const { state, dispatch } = usePalette()

  const handleValueChange = (value: any) => {
    dispatch({ type: 'SET_VALUE_TYPE', payload: { valueType: value } })
  }

  return (
    <Select value={state.valueType.value} items={valueTypesList} onValueChange={handleValueChange}>
      <SelectTrigger className={cn('', className)} ref={ref} {...props}>
        <SelectValue />
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          <SelectGroup>
            {valueTypesList.map(({ label, value }) => (
              <SelectItem key={label} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
          {children}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
