import { NotePencilIcon } from '@phosphor-icons/react'
import chroma from 'chroma-js'
import {
  Button,
  cn,
  ColorPicker,
  ColorPickerArea,
  ColorPickerGroup,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerRow,
  ColorPickerTransparencySlider,
  ColorPickerValueType,
  Popover,
  PopoverContent,
  PopoverPanel,
  PopoverTrigger,
} from 'dawn-ui-react'
import React from 'react'
import { useColor } from '#/features/color/components/provider'
import { getForeground } from '#/features/color/utils/style'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorEditColorProps = React.ComponentProps<typeof Button>

export const PaletteEditorEditColor = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorEditColorProps) => {
  const { color } = useColor()
  const { dispatch } = usePalette()
  const [newColor, setNewColor] = React.useState<string>(color.value)
  const chromaColor = chroma(color.value)
  const isDark = chromaColor.luminance() < 0.5

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNewColor(color.value)
      return
    }

    dispatch({
      type: 'SET_COLOR',
      payload: {
        id: color.id,
        colorValue: newColor,
      },
    })
  }

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button
          variant={'ghost'}
          tone="neutral"
          size="iconMedium"
          style={{
            backgroundColor: isDark
              ? chromaColor.brighten(0.5).hex()
              : chromaColor.darken(0.5).hex(),
            color: getForeground(color.value),
          }}
          className={cn(
            'opacity-0 transition-all not-hover:bg-transparent! group-hover:opacity-100 [&>svg]:shrink-0',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
          <NotePencilIcon weight="bold" />
        </Button>
      </PopoverTrigger>
      <PopoverPanel>
        <PopoverContent>
          <ColorPicker
            value={newColor}
            onValueChange={setNewColor}
            variant={'ghost'}
            className="w-[30dvh]"
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
          </ColorPicker>
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
