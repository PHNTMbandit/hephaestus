import { BroomIcon } from '@phosphor-icons/react'
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
} from 'dawn-ui-react'
import React from 'react'
import { usePalette } from '../hooks/use-palette'
import { PaletteCount } from './palette-count'
import { PaletteGenerate } from './palette-generate'
import { PaletteGeneratorSelect } from './palette-generator-select'

type PaletteGeneratorContentProps = React.ComponentProps<'div'>

export const PaletteGeneratorContent = ({
  className,
  children,
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

  const handleApply = () => {
    dispatch({
      type: 'SET_BASE_COLOR',
      payload: { baseColor: pendingColor },
    })
  }

  return (
    <TabsPanel value="generator">
      <ColorPicker
        value={pendingColor}
        onValueChange={(e) => handleColorChange(e.hex())}
        variant={'ghost'}
        className={cn('', className)}
        ref={ref}
        {...props}
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
        {children}
      </ColorPicker>
      <div className="flex w-full flex-col gap-sm">
        <PaletteCount />
        <PaletteGeneratorSelect />
        <Button onClick={handleApply} className={'w-full'}>
          <BroomIcon weight="bold" />
          Apply Color
        </Button>
        <PaletteGenerate />
      </div>
    </TabsPanel>
  )
}
