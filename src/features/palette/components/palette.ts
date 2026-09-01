import { PaletteCard } from './card'
import { PaletteDeletePalette } from './delete-palette'
import { PaletteDescription } from './description'
import { PaletteGradient } from './gradient'
import { PaletteName } from './name'
import { PaletteRoot } from './root'
import { PaletteSwatches } from './swatches'

export const Palette = {
  Root: PaletteRoot,
  Swatches: PaletteSwatches,
  Name: PaletteName,
  Description: PaletteDescription,
  Gradient: PaletteGradient,
  Card: PaletteCard,
  DeletePalette: PaletteDeletePalette,
}
