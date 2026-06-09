import type { Colour } from '../../colour/colour.types'
import type { PaletteGeneratorMethod } from './generator'
import type { ValueType } from './value'

export type PaletteState = {
  baseColour: string
  colours: Colour[]
  currentGeneratorMethod: PaletteGeneratorMethod
  limit: number
  valueType: ValueType
}

export type PaletteAction =
  | { type: 'ADD' }
  | { type: 'ADD_AT'; payload: { index: number; colour: Colour } }
  | { type: 'REMOVE' }
  | { type: 'REMOVE_AT'; payload: { index: number } }
  | { type: 'UPDATE'; payload: { id: string; hex: string } }
  | { type: 'LOCK'; payload: { id: string } }
  | { type: 'UNLOCK'; payload: { id: string } }
  | { type: 'REORDER'; payload: { newColours: Colour[] } }
  | { type: 'GENERATE' }
  | { type: 'RECALIBRATE' }
  | { type: 'SET_BASE_COLOUR'; payload: { baseColour: string } }
  | { type: 'SET_GENERATOR_METHOD'; payload: { id: string } }
  | { type: 'SET_VALUE_TYPE'; payload: { valueType: string } }
  | { type: 'SET_LIMIT'; payload: { limit: number } }
  | { type: 'RESET' }

export type PaletteContextValue = {
  state: PaletteState
  dispatch: React.Dispatch<PaletteAction>
}
