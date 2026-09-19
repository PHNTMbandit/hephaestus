import { CaretUpDownIcon } from '@phosphor-icons/react'
import {
  cn,
  Label,
  NumberField,
  Select,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
  Separator,
} from 'dawn-ui-react'
import { FONT_WEIGHTS } from '#/features/accessibility/constants/font'
import { useContrastChecker } from '../hooks/use-contrast-checker'

type ContrastApcaFontControlsProps = React.ComponentProps<'div'>

const weightLabel = (weight: string) => {
  const match = FONT_WEIGHTS.find((option) => String(option.value) === weight)
  return match ? `${match.value} · ${match.label}` : weight
}

export const ContrastApcaFontControls = ({
  className,
  children,
  ref,
  ...props
}: ContrastApcaFontControlsProps) => {
  const { state, dispatch } = useContrastChecker()

  if (state.contrastMethod !== 'APCA') return null

  return (
    <div className="px-md py-sm">
      <Separator />
      <div className={cn('flex flex-col gap-sm pt-md', className)} ref={ref} {...props}>
        {children}
        <Label size={'large'}>Font</Label>
        <div className="flex flex-col items-center gap-xs">
          <NumberField
            variant={'secondary'}
            min={1}
            max={144}
            value={state.fontSize}
            onValueChange={(value: any) =>
              dispatch({ type: 'SET_FONT_SIZE', payload: { fontSize: value } })
            }
            className={'w-full'}
          >
            px
          </NumberField>
          <Select
            value={String(state.fontWeight)}
            items={FONT_WEIGHTS.map((option) => ({
              label: `${option.value} · ${option.label}`,
              value: String(option.value),
            }))}
            onValueChange={(value: any) =>
              dispatch({ type: 'SET_FONT_WEIGHT', payload: { fontWeight: Number(value) } })
            }
          >
            <SelectTrigger variant={'secondary'} className="w-full">
              <SelectValue>{(value: string) => weightLabel(value)}</SelectValue>
              <SelectIcon>
                <CaretUpDownIcon weight="bold" />
              </SelectIcon>
            </SelectTrigger>
            <SelectPopup>
              <SelectList>
                <SelectGroup>
                  {FONT_WEIGHTS.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      <SelectTitle>
                        {option.value} · {option.label}
                      </SelectTitle>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectList>
            </SelectPopup>
          </Select>
        </div>
      </div>
    </div>
  )
}
