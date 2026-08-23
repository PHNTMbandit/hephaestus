import { paletteGeneratorMethods } from '../utils/generator-methods'
import { valueTypes } from './values'

import type { PaletteState } from '../types/state'

export const PALETTE_CONFIG = {
  DEFAULT_LIMIT: 10,
  DEFAULT_MODE: 'list' as const,
  DEFAULT_BASE_COLOR: '#ff0000',
  INITIAL_COLORS_COUNT: 5,
}

export const defaultPaletteState: PaletteState = {
  undoActions: [],
  redoActions: [],
  baseColor: PALETTE_CONFIG.DEFAULT_BASE_COLOR,
  colors: [],
  currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
  limit: PALETTE_CONFIG.DEFAULT_LIMIT,
  mode: PALETTE_CONFIG.DEFAULT_MODE,
  valueType: valueTypes.hex,
}
