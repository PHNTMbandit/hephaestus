import { paletteGeneratorMethods } from '../utils/generator-methods'
import { valueTypes } from './values'

import type { PaletteState } from '../types/state'

export const defaultPaletteState: Omit<PaletteState, 'baseColour' | 'colours'> = {
  currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
  limit: 10,
  valueType: valueTypes.rgb,
}
