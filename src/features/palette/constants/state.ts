import { paletteGeneratorMethods } from '../utils/generator-methods'
import { valueTypes } from './values'

import type { PaletteState } from '../types/state'

export const PALETTE_CONFIG = {
  DEFAULT_LIMIT: 10,
  DEFAULT_MODE: 'list' as const,
  DEFAULT_BASE_COLOUR: '#ff0000',
  INITIAL_COLOURS_COUNT: 5,
}

export const defaultPaletteState: PaletteState = {
  baseColour: PALETTE_CONFIG.DEFAULT_BASE_COLOUR,
  colours: [],
  currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
  limit: PALETTE_CONFIG.DEFAULT_LIMIT,
  mode: PALETTE_CONFIG.DEFAULT_MODE,
  valueType: valueTypes.rgb,
}

export type SerializablePaletteState = {
  colours: PaletteState['colours']
  baseColour: string
  limit: number
  mode: PaletteState['mode']
}

export function createPaletteState(data: SerializablePaletteState): PaletteState {
  return {
    ...data,
    currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
    valueType: valueTypes.rgb,
  }
}
