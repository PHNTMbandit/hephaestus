import { CaretUpDownIcon } from '@phosphor-icons/react'
import { useDbClient, useLiveQuery } from '@tanstack/react-db'
import { useNavigate } from '@tanstack/react-router'
import {
  cn,
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from 'dawn-ui-react'
import { paletteCollection } from '../db/collection'

type PaletteProjectSelectProps = React.ComponentProps<typeof SelectTrigger> & {
  value: string
}

export const PaletteProjectSelect = ({
  value,
  className,
  children,
  ref,
  ...props
}: PaletteProjectSelectProps) => {
  const navigate = useNavigate()
  const collection = useDbClient().collection(paletteCollection)
  const { data: palettes } = useLiveQuery((q) => q.from({ palette: collection }))

  const handleSelect = (value: any) => {
    navigate({ to: '/palette-generator/{-$projectId}', params: { projectId: value } })
  }

  return (
    <Select value={value} onValueChange={handleSelect}>
      <SelectTrigger variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
        {children}
        <SelectValue>
          {(value: keyof typeof palettes) => {
            const selectedPalette = palettes.find((palette) => palette.id === value)
            return selectedPalette ? selectedPalette.name : 'Select a palette'
          }}
        </SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup align="start" sideOffset={2} alignItemWithTrigger={false}>
        <SelectList>
          {palettes.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
