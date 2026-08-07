import chroma from 'chroma-js'
import { WCAG_GRADES } from '../constants/accessibility'

import type { WCAGGrade } from '../color.types'

export const getForeground = (background: string): string => {
  const bg = chroma(background)
  const [l] = bg.oklch()
  const fgLightness = l > 0.6 ? 0.35 : 0.9
  const [, c, h] = bg.oklch()
  const fg = chroma.oklch(fgLightness, c * 0.9, h)

  return fg.hex()
}

export const getWCAGRating = (background: string, foreground: string): WCAGGrade => {
  const contrast = chroma.contrast(background, foreground)
  return (
    Object.values(WCAG_GRADES).find((grade) => contrast >= grade.thresholds.normal) ||
    Object.values(WCAG_GRADES)[Object.values(WCAG_GRADES).length - 1]
  )
}
