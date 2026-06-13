import type { Colour } from '../../colour/colour.types'
import type { PaletteGeneratorMethod } from './generator'
import type { ValueType } from './value'

export type PaletteState = {
  colours: Colour[]
  valueType: ValueType
  baseColour: string
  currentGeneratorMethod: PaletteGeneratorMethod
  limit: number
  mode: 'list' | 'preview'
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
  | { type: 'SET_MODE'; payload: { mode: 'list' | 'preview' } }
  | { type: 'RESET' }

export type PaletteContextValue = {
  state: PaletteState
  dispatch: React.Dispatch<PaletteAction>
}

export type SerializablePaletteState = {
  colours: PaletteState['colours']
  baseColour: string
  limit: number
  mode: PaletteState['mode']
}
