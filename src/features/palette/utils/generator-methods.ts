import {
  generateComplementaryColour,
  generateComplementaryPalette,
  generateMonochromaticColour,
  generateMonochromaticPalette,
  generateRandomColour,
} from './colour-generators'

import type { PaletteGeneratorMethod } from '../types/generator'

export const paletteGeneratorMethods = {
  random: {
    id: 'random',
    name: 'Random',
    description: 'Generates a completely random palette.',
    generate: generateRandomColour,
    generatePalette: (_baseColour: string, count: number) =>
      Array.from({ length: count }, generateRandomColour),
  },
  monochromatic: {
    id: 'monochromatic',
    name: 'Monochromatic',
    description: 'Generates a palette based on different shades of a single colour.',
    generate: (baseColour: string, index: number, total: number) =>
      generateMonochromaticColour(baseColour, index, total),
    generatePalette: (baseColour: string, count: number) =>
      generateMonochromaticPalette(baseColour, count),
  },
  complementary: {
    id: 'complementary',
    name: 'Complementary',
    description: 'Generates a palette consisting of complementary colours.',
    generate: (baseColour: string) => generateComplementaryColour(baseColour),
    generatePalette: (baseColour: string, count: number) =>
      generateComplementaryPalette(baseColour, count),
  },
} as const satisfies Record<string, PaletteGeneratorMethod>

export type PaletteGeneratorMethodId = keyof typeof paletteGeneratorMethods

export const paletteGeneratorMethodsList = Object.values(
  paletteGeneratorMethods,
) as PaletteGeneratorMethod[]
