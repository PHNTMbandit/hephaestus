import { CheckIcon, ShuffleIcon } from '@phosphor-icons/react'
import {
  cn,
  Button,
  TabsPanel,
  ColorPicker,
  ColorPickerArea,
  ColorPickerGroup,
  ColorPickerHueSlider,
  ColorPickerTransparencySlider,
  ColorPickerRow,
  ColorPickerValueType,
  ColorPickerInput,
  Separator,
} from 'dawn-ui-react'
import React from 'react'
import { usePalette } from '../hooks/use-palette'
import { generateRandomColor } from '../utils'
import { PaletteCount } from './palette-count'
import { PaletteGeneratorSelect } from './palette-generator-select'

type PaletteGeneratorContentProps = React.ComponentProps<'div'>

export const PaletteGeneratorContent = ({
  className,
  ref,
  ...props
}: PaletteGeneratorContentProps) => {
  const {
    state: { baseColor },
    dispatch,
  } = usePalette()
  const [pendingColor, setPendingColor] = React.useState<string>(baseColor)

  React.useEffect(() => {
    setPendingColor(baseColor)
  }, [baseColor])

  const handleColorChange = (color: string) => {
    setPendingColor(color)
  }

  const handleRandomColor = () => {
    setPendingColor(generateRandomColor().value)
  }

  const handleApply = () => {
    dispatch({
      type: 'SET_BASE_COLOR',
      payload: { baseColor: pendingColor },
    })
  }

  return (
    <TabsPanel value="generator">
      <div className={cn('flex w-full flex-col gap-md p-md', className)} ref={ref} {...props}>
        <ColorPicker
          color={pendingColor}
          onValueChange={(e) => handleColorChange(e.hex())}
          variant={'ghost'}
        >
          <ColorPickerArea />
          <ColorPickerGroup>
            <ColorPickerHueSlider />
            <ColorPickerTransparencySlider />
            <ColorPickerRow>
              <ColorPickerValueType />
              <ColorPickerInput />
            </ColorPickerRow>
          </ColorPickerGroup>
          <Button tone="neutral" variant="outline" onClick={handleRandomColor} className="w-full">
            <ShuffleIcon weight="bold" />
            Random color
          </Button>
        </ColorPicker>
        <Separator />
        <div className="space-y-xs">
          <PaletteGeneratorSelect />
          <PaletteCount />
          <div className="flex flex-col gap-sm">
            <Button onClick={handleApply} className="w-full">
              <CheckIcon weight="bold" />
              Apply
            </Button>
          </div>
        </div>
      </div>
    </TabsPanel>
  )
}
