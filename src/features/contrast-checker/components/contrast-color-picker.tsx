import {
  cn,
  ColorPicker,
  ColorPickerArea,
  ColorPickerGroup,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerPaletteLimit,
  ColorPickerPaletteList,
  ColorPickerPaletteSwatch,
  ColorPickerRow,
  ColorPickerTransparencySlider,
  ColorPickerValueType,
} from 'dawn-ui-react'

type ContrastColorPickerProps = React.ComponentProps<typeof ColorPicker>

const defaultPalette = [
  '#000000',
  '#ffffff',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
]

export const ContrastColorPicker = ({
  className,
  children,
  ref,
  ...props
}: ContrastColorPickerProps) => {
  return (
    <ColorPicker
      defaultPalette={defaultPalette}
      paletteLimit={25}
      variant={'ghost'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <ColorPickerGroup>
        <ColorPickerRow>
          <ColorPickerValueType />
          <ColorPickerInput showPopover>
            <ColorPickerArea />
            <ColorPickerGroup>
              <ColorPickerHueSlider />
              <ColorPickerTransparencySlider />
            </ColorPickerGroup>
          </ColorPickerInput>
        </ColorPickerRow>
      </ColorPickerGroup>
      <ColorPickerGroup>
        <ColorPickerRow>
          <ColorPickerLabel>Saved</ColorPickerLabel>
          <ColorPickerPaletteLimit />
        </ColorPickerRow>
        <ColorPickerPaletteList>
          {({ color, index }) => (
            <ColorPickerPaletteSwatch key={index} color={color} size="medium" />
          )}
        </ColorPickerPaletteList>
      </ColorPickerGroup>
    </ColorPicker>
  )
}
