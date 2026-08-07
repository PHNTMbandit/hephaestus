import type { Color } from '#/features/color/color.types.ts'

export type PaletteGeneratorMethod = {
  id: string
  name: string
  description: string
  generate: (baseColor: string, index: number, total: number, range?: number) => Color
  generatePalette: (baseColor: string, count: number, range?: number) => Color[]
}
