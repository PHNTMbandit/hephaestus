import type { Colour } from '#/features/colour/colour.types.ts'

export type PaletteGeneratorMethod = {
  id: string
  name: string
  description: string
  generate: (baseColour: string, index: number, total: number, range?: number) => Colour
  generatePalette: (baseColour: string, count: number, range?: number) => Colour[]
}
