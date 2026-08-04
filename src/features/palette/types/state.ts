import type { Color } from '../../color/color.types'
import type { PaletteGeneratorMethod } from './generator'
import type { ValueType } from './value'

export type PaletteState = {
  colors: Color[]
  valueType: ValueType
  baseColor: string
  currentGeneratorMethod: PaletteGeneratorMethod
  limit: number
  mode: 'list' | 'preview'
}

export type PaletteAction =
  | { type: 'ADD' }
  | { type: 'ADD_AT'; payload: { index: number; color: Color } }
  | { type: 'REMOVE' }
  | { type: 'REMOVE_AT'; payload: { index: number } }
  | { type: 'UPDATE'; payload: { id: string; hex: string } }
  | { type: 'LOCK'; payload: { id: string } }
  | { type: 'UNLOCK'; payload: { id: string } }
  | { type: 'REORDER'; payload: { newColors: Color[] } }
  | { type: 'GENERATE' }
  | { type: 'SET_BASE_COLOR'; payload: { baseColor: string } }
  | { type: 'SET_GENERATOR_METHOD'; payload: { id: string } }
  | { type: 'SET_VALUE_TYPE'; payload: { valueType: string } }
  | { type: 'SET_LIMIT'; payload: { limit: number } }
  | { type: 'SET_MODE'; payload: { mode: 'list' | 'preview' } }
  | {
      type: 'RESET'
      payload: {
        colors: Color[]
        baseColor: string
      }
    }

export type PaletteContextValue = {
  state: PaletteState
  dispatch: React.Dispatch<PaletteAction>
}

export type SerializablePaletteState = {
  colors: PaletteState['colors']
  baseColor: string
  limit: number
  mode: PaletteState['mode']
}
