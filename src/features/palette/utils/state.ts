import { valueTypes } from '../constants/values'
import { paletteGeneratorMethods } from './generator-methods'

import type { PaletteState, SerializablePaletteState } from '../types/state'

export function createPaletteState(data: SerializablePaletteState): PaletteState {
  return {
    ...data,
    currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
    valueType: valueTypes.rgb,
  }
}
