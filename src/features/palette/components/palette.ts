import { PaletteCard } from './card'
import { PaletteCardFooter } from './card-footer'
import { PaletteDeletePalette } from './delete-palette'
import { PaletteDescription } from './description'
import { PaletteGradient } from './gradient'
import { PaletteGrid } from './grid'
import { PaletteLink } from './link'
import { PaletteMenu } from './menu'
import { PaletteMenuExport } from './menu-export'
import { PaletteMenuOpen } from './menu-open'
import { PaletteName } from './name'
import { PaletteSaves } from './palette-saves'
import { PaletteRoot } from './root'
import { PaletteSwatches } from './swatches'

export const Palette = {
  Card: PaletteCard,
  CardFooter: PaletteCardFooter,
  DeletePalette: PaletteDeletePalette,
  Description: PaletteDescription,
  Gradient: PaletteGradient,
  Grid: PaletteGrid,
  Menu: PaletteMenu,
  MenuExport: PaletteMenuExport,
  MenuOpen: PaletteMenuOpen,
  Link: PaletteLink,
  Name: PaletteName,
  Root: PaletteRoot,
  Saves: PaletteSaves,
  Swatches: PaletteSwatches,
}
