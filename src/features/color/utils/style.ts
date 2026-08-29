import chroma from 'chroma-js'

import type { Color } from '../color.types'

const WCAG_AA_NORMAL_TEXT = 4.5

export const getForeground = (background: string): string => {
  const bg = chroma(background)
  const [l] = bg.oklch()
  const fgLightness = l > 0.6 ? 0.35 : 0.9
  const [, c, h] = bg.oklch()
  const fg = chroma.oklch(fgLightness, c * 0.9, h)

  return fg.hex()
}

export const getCompatiblePalettes = (
  colors: Color[],
  minContrast: number = WCAG_AA_NORMAL_TEXT,
): { foreground: Color; background: Color }[] => {
  const uniqueColors = Array.from(new Map(colors.map((color) => [color.value, color])).values())

  return uniqueColors.flatMap((background) =>
    uniqueColors
      .filter(
        (foreground) =>
          foreground.value !== background.value &&
          chroma.contrast(foreground.value, background.value) >= minContrast,
      )
      .map((foreground) => ({ foreground, background })),
  )
}
