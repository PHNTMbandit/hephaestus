import { SquareSplitVerticalIcon } from '@phosphor-icons/react'
import chroma from 'chroma-js'
import { Button, cn, Popover, PopoverContent, PopoverPanel, PopoverTrigger } from 'dawn-ui-react'
import { useState } from 'react'
import { Color as ColorComponent } from '#/features/color/components/color'
import { useColor } from '#/features/color/components/provider'
import { getForeground } from '#/features/color/utils/style'
import { Palette } from '#/features/palette/components/palette'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { generateMonochromaticPalette } from '#/features/palette/utils'

import type { Color } from '#/features/color/color.types'

type PaletteEditorColorShadesProps = React.ComponentProps<typeof Button>

export const PaletteEditorColorShades = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorColorShadesProps) => {
  const { color } = useColor()
  const { state, dispatch } = usePalette()
  const chromaColor = chroma(color.value)
  const isDark = chromaColor.luminance() < 0.5
  const [shades] = useState(() => {
    const seen = new Set<string>()
    return generateMonochromaticPalette(color.value, 20)
      .reverse()
      .filter((shade) => (seen.has(shade.value) ? false : seen.add(shade.value)))
  })
  const isCurrentColor = (shade: string) => shade === color.value

  const handleClick = (newColor: Color) => {
    dispatch({
      type: 'SET_COLOR',
      payload: {
        id: color.id,
        colorValue: newColor.value,
      },
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="iconMedium"
          tone="neutral"
          variant="ghost"
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
          <SquareSplitVerticalIcon weight="bold" />
        </Button>
      </PopoverTrigger>
      <PopoverPanel side="right" className={'w-[20vh]!'}>
        <PopoverContent>
          <Palette.Root
            initialState={{
              colors: shades,
            }}
          >
            <Palette.Swatches orientation={'vertical'} rounded="large">
              {({ color }) => (
                <ColorComponent.Provider color={color}>
                  <button
                    onClick={() => handleClick(color)}
                    className="group w-full hover:cursor-pointer"
                  >
                    <ColorComponent.Swatch size="small">
                      {isCurrentColor(color.value) && (
                        <div
                          className="absolute top-1/2 left-1/2 size-xs -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors group-hover:opacity-0"
                          style={{
                            backgroundColor: getForeground(color.value),
                          }}
                        />
                      )}
                      <ColorComponent.Value className="text-center opacity-0! transition-all group-hover:opacity-100!">
                        {state.valueType?.displayColor(color.value)}
                      </ColorComponent.Value>
                    </ColorComponent.Swatch>
                  </button>
                </ColorComponent.Provider>
              )}
            </Palette.Swatches>
          </Palette.Root>
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
