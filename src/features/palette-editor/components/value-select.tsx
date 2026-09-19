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
import { usePalette } from '#/features/palette/hooks/use-palette'
import { valueTypesList } from '#/features/palette/utils'

type PaletteEditorValueSelectProps = React.ComponentProps<typeof SelectTrigger>

export const PaletteEditorValueSelect = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorValueSelectProps) => {
  const { state, dispatch } = usePalette()
  const valueType = state.valueType ?? valueTypesList[0]

  const handleValueChange = (value: any) => {
    dispatch({ type: 'SET_VALUE_TYPE', payload: { valueType: value } })
  }

  return (
    <Select value={valueType?.value} items={valueTypesList} onValueChange={handleValueChange}>
      <SelectTrigger variant={'secondary'} className={cn('w-full', className)} ref={ref} {...props}>
        <SelectValue />
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup sideOffset={2}>
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
