import chroma from 'chroma-js'

import type { Color } from '../../color/color.types'

export const generateRandomColor = (): Color => {
  return {
    id: crypto.randomUUID(),
    value: chroma.random().hex(),
    locked: false,
  }
}

export const generateInbetweenColor = (colors: Color[], targetIndex: number): Color => {
  const currentColor = colors[targetIndex]
  const previousColor = colors[targetIndex - 1]

  if (!previousColor) {
    const nextColor = colors[targetIndex + 1]
    const mixTarget = nextColor
      ? chroma.mix(currentColor.value, nextColor.value, 0.5)
      : chroma(currentColor.value).brighten(0.5)

    return {
      id: crypto.randomUUID(),
      value: mixTarget.hex(),
      locked: false,
    }
  }

  const inbetweenColor = chroma.mix(currentColor.value, previousColor.value, 0.5)
  return {
    id: crypto.randomUUID(),
    value: inbetweenColor.hex(),
    locked: false,
  }
}

export const generateMonochromaticColor = (
  baseColor: string,
  index: number,
  total: number,
): Color => {
  const baseChroma = chroma(baseColor)
  const baseLightness = baseChroma.get('hsl.l') as number
  const range = 0.45
  const step = total > 1 ? (range * 2) / (total - 1) : 0
  const newLightness = Math.max(0.02, Math.min(0.98, baseLightness + (-range + step * index)))

  return {
    id: crypto.randomUUID(),
    value: baseChroma.set('hsl.l', newLightness).hex(),
    locked: false,
  }
}

export const generateMonochromaticPalette = (baseColor: string, count: number): Color[] => {
  return Array.from({ length: count }, (_, i) => generateMonochromaticColor(baseColor, i, count))
}

export const generateComplementaryColor = (baseColor: string): Color => {
  const complementaryColor = chroma(baseColor).set(
    'hsl.h',
    (chroma(baseColor).get('hsl.h') + 180) % 360,
  )
  return {
    id: crypto.randomUUID(),
    value: complementaryColor.hex(),
    locked: false,
  }
}

export const generateComplementaryPalette = (baseColor: string, count: number): Color[] => {
  const complementaryColor = generateComplementaryColor(baseColor)
  return Array.from({ length: count }, (_, i) => ({
    id: crypto.randomUUID(),
    hex: i % 2 === 0 ? baseColor : complementaryColor.value,
    locked: false,
    value: i % 2 === 0 ? baseColor : complementaryColor.value,
  }))
}
