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
  SelectTitle,
  SelectDescription,
} from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { paletteGeneratorMethods, paletteGeneratorMethodsList } from '#/features/palette/utils'

type PaletteEditorAlgorithmSelectProps = React.ComponentProps<typeof SelectTrigger>

export const PaletteEditorAlgorithmSelect = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorAlgorithmSelectProps) => {
  const { state, dispatch } = usePalette()

  const handleValueChange = (value: any) => {
    dispatch({ type: 'SET_GENERATOR_METHOD', payload: { id: value } })
  }

  return (
    <Select
      value={state.currentGeneratorMethod.id}
      items={paletteGeneratorMethodsList.map((m) => ({ label: m.name, value: m.id }))}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className={cn('w-full', className)} ref={ref} {...props}>
        <SelectValue>
          {(value: keyof typeof paletteGeneratorMethods) => paletteGeneratorMethods[value].name}
        </SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          <SelectGroup>
            {paletteGeneratorMethodsList.map(({ id, name, description }) => (
              <SelectItem key={id} value={id}>
                <SelectTitle>{name}</SelectTitle>
                <SelectDescription>{description}</SelectDescription>
              </SelectItem>
            ))}
          </SelectGroup>
          {children}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
