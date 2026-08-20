import chroma from 'chroma-js'

export const getForeground = (background: string): string => {
  const bg = chroma(background)
  const [l] = bg.oklch()
  const fgLightness = l > 0.6 ? 0.35 : 0.9
  const [, c, h] = bg.oklch()
  const fg = chroma.oklch(fgLightness, c * 0.9, h)

  return fg.hex()
}
