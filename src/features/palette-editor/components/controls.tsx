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
import { usePalette } from '#/features/palette/hooks/use-palette'
import { generateRandomColor } from '#/features/palette/utils'
import { PaletteEditorAlgorithmSelect } from './algorithm-select'
import { PaletteEditorColorCount } from './color-count'

type PaletteEditorControlsProps = React.ComponentProps<'div'>

export const PaletteEditorControls = ({ className, ref, ...props }: PaletteEditorControlsProps) => {
  const {
    state: { baseColor },
    dispatch,
  } = usePalette()
  const [pendingColor, setPendingColor] = React.useState<string>(baseColor)

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
        <ColorPicker color={pendingColor} onValueChange={handleColorChange} variant={'ghost'}>
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
          <PaletteEditorAlgorithmSelect />
          <PaletteEditorColorCount />
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
