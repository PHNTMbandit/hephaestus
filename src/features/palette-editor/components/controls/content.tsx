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
import { PaletteEditorControlsAlgorithmSelect } from './algorithm-select'
import { PaletteEditorControlsColorCount } from './color-count'

type PaletteEditorControlsContentProps = React.ComponentProps<'div'>

export const PaletteEditorControlsContent = ({
  className,
  ref,
  ...props
}: PaletteEditorControlsContentProps) => {
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
    <TabsPanel value="controls">
      <div className={cn('flex w-full flex-col gap-md p-md', className)} ref={ref} {...props}>
        <ColorPicker value={pendingColor} onValueChange={handleColorChange} variant={'ghost'}>
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
          <PaletteEditorControlsAlgorithmSelect />
          <PaletteEditorControlsColorCount />
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
