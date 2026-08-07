import {
  generateComplementaryColor,
  generateComplementaryPalette,
  generateMonochromaticColor,
  generateMonochromaticPalette,
  generateRandomColor,
} from './color-generators'

import type { PaletteGeneratorMethod } from '../types/generator'

export const paletteGeneratorMethods = {
  random: {
    id: 'random',
    name: 'Random',
    description: 'Generates a completely random palette.',
    generate: generateRandomColor,
    generatePalette: (_baseColor: string, count: number) =>
      Array.from({ length: count }, generateRandomColor),
  },
  monochromatic: {
    id: 'monochromatic',
    name: 'Monochromatic',
    description: 'Generates a palette based on different shades of a single color.',
    generate: (baseColor: string, index: number, total: number) =>
      generateMonochromaticColor(baseColor, index, total),
    generatePalette: (baseColor: string, count: number) =>
      generateMonochromaticPalette(baseColor, count),
  },
  complementary: {
    id: 'complementary',
    name: 'Complementary',
    description: 'Generates a palette consisting of complementary colors.',
    generate: (baseColor: string) => generateComplementaryColor(baseColor),
    generatePalette: (baseColor: string, count: number) =>
      generateComplementaryPalette(baseColor, count),
  },
} as const satisfies Record<string, PaletteGeneratorMethod>

export type PaletteGeneratorMethodId = keyof typeof paletteGeneratorMethods

export const paletteGeneratorMethodsList = Object.values(
  paletteGeneratorMethods,
) as PaletteGeneratorMethod[]
