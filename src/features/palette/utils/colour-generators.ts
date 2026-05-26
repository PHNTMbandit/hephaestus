import chroma from 'chroma-js'

import type { Colour } from '../../colour/colour.types'

export const generateRandomColour = (): Colour => {
  return {
    id: crypto.randomUUID(),
    value: chroma.random().hex(),
    locked: false,
  }
}

export const generateInbetweenColour = (colours: Colour[], targetIndex: number): Colour => {
  const currentColour = colours[targetIndex]
  const previousColour = colours[targetIndex - 1]

  if (!previousColour) {
    const nextColour = colours[targetIndex + 1]
    const mixTarget = nextColour
      ? chroma.mix(currentColour.value, nextColour.value, 0.5)
      : chroma(currentColour.value).brighten(0.5)

    return {
      id: crypto.randomUUID(),
      value: mixTarget.hex(),
      locked: false,
    }
  }

  const inbetweenColour = chroma.mix(currentColour.value, previousColour.value, 0.5)
  return {
    id: crypto.randomUUID(),
    value: inbetweenColour.hex(),
    locked: false,
  }
}

export const generateMonochromaticColour = (
  baseColour: string,
  index: number,
  total: number,
): Colour => {
  const baseChroma = chroma(baseColour)
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

export const generateMonochromaticPalette = (baseColour: string, count: number): Colour[] => {
  return Array.from({ length: count }, (_, i) => generateMonochromaticColour(baseColour, i, count))
}

export const generateComplementaryColour = (baseColour: string): Colour => {
  const complementaryColour = chroma(baseColour).set(
    'hsl.h',
    (chroma(baseColour).get('hsl.h') + 180) % 360,
  )
  return {
    id: crypto.randomUUID(),
    value: complementaryColour.hex(),
    locked: false,
  }
}

export const generateComplementaryPalette = (baseColour: string, count: number): Colour[] => {
  const complementaryColour = generateComplementaryColour(baseColour)
  return Array.from({ length: count }, (_, i) => ({
    id: crypto.randomUUID(),
    hex: i % 2 === 0 ? baseColour : complementaryColour.value,
    locked: false,
  }))
}
