import { useLiveQuery } from '@tanstack/react-db'
import { useRouteContext } from '@tanstack/react-router'
import chroma from 'chroma-js'
import {
  cn,
  ColorPicker,
  ColorPickerArea,
  ColorPickerGroup,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerPaletteList,
  ColorPickerPaletteSwatch,
  ColorPickerTransparencySlider,
  ColorPickerValueType,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from 'dawn-ui-react'
import React from 'react'

type ContrastColorPickerProps = React.ComponentProps<typeof ColorPicker> & {
  palette?: string[]
  onPaletteChange?: (palette: string[]) => void
}

export const ContrastColorPicker = ({
  className,
  children,
  ref,
  palette,
  onPaletteChange,
  ...props
}: ContrastColorPickerProps) => {
  const { paletteCollection } = useRouteContext({ from: '__root__' })
  const { data: palettes } = useLiveQuery((q) => q.from({ palette: paletteCollection }))

  const handleSelectPalette = (value: (typeof palettes)[number] | null) => {
    if (value) {
      const hexColors = value.colors.map((c: any) => c.value ?? c.hex?.() ?? '#000000')
      onPaletteChange?.(hexColors)
    } else {
      onPaletteChange?.(['#000000'])
    }
  }

  return (
    <ColorPicker
      defaultValueType="hex"
      paletteLimit={25}
      variant={'ghost'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <ColorPickerGroup>
        <ColorPickerInput showPopover>
          <ColorPickerArea />
          <ColorPickerGroup>
            <ColorPickerHueSlider />
            <ColorPickerTransparencySlider />
            <ColorPickerValueType />
            <ColorPickerInput />
          </ColorPickerGroup>
        </ColorPickerInput>
      </ColorPickerGroup>
      <ColorPickerGroup>
        <Combobox
          items={palettes}
          onValueChange={(value) => handleSelectPalette(value as (typeof palettes)[number] | null)}
          itemToStringLabel={(palette) => (palette as (typeof palettes)[number] | null)?.name ?? ''}
        >
          <ComboboxInput variant={'secondary'} placeholder="Select a saved palette" />
          <ComboboxPopup>
            <ComboboxEmpty>No saved palettes found</ComboboxEmpty>
            <ComboboxList>
              {(palette: (typeof palettes)[number]) => (
                <ComboboxItem key={palette.id} value={palette}>
                  {palette.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <ColorPickerPaletteList>
          {palette?.map((color, idx) => (
            <ColorPickerPaletteSwatch key={idx} color={chroma(color)} />
          ))}
        </ColorPickerPaletteList>
      </ColorPickerGroup>
    </ColorPicker>
  )
}
