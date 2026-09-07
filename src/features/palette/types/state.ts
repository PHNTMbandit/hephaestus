import type { Color } from '../../color/color.types'
import type { PaletteCommand } from '../utils'
import type { PaletteGeneratorMethod } from './generator'
import type { ValueType } from './value'

export type PaletteRenderMode = 'list' | 'gradient' | 'swatches' | 'blocks'

export type PaletteState = {
  undoActions: PaletteCommand[]
  redoActions: PaletteCommand[]
  colors: Color[]
  valueType: ValueType
  baseColor: string
  currentGeneratorMethod: PaletteGeneratorMethod
  limit: number
  mode: PaletteRenderMode
  id?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
  name?: string
  saving?: boolean
}

export type PaletteAction =
  | { type: 'ADD' }
  | { type: 'ADD_AT'; payload: { index: number; color: Color } }
  | { type: 'REMOVE' }
  | { type: 'REMOVE_AT'; payload: { index: number } }
  | { type: 'UPDATE'; payload: { id: string; hex: string } }
  | { type: 'SET_IS_SAVING'; payload: { saving: boolean } }
  | { type: 'LOCK'; payload: { id: string } }
  | { type: 'UNLOCK'; payload: { id: string } }
  | { type: 'REORDER'; payload: { newColors: Color[] } }
  | { type: 'GENERATE' }
  | { type: 'SET_BASE_COLOR'; payload: { baseColor: string } }
  | { type: 'SET_COLOR'; payload: { id: string; colorValue: string } }
  | { type: 'SET_COLORS'; payload: { colors: Color[] } }
  | { type: 'SET_GENERATOR_METHOD'; payload: { id: string } }
  | { type: 'SET_VALUE_TYPE'; payload: { valueType: string } }
  | { type: 'SET_LIMIT'; payload: { limit: number } }
  | { type: 'SET_RENDER_MODE'; payload: { mode: PaletteRenderMode } }
  | {
      type: 'RESET'
      payload: {
        colors: Color[]
        baseColor: string
      }
    }
  | { type: 'UNDO' }
  | { type: 'REDO' }

export type PaletteContextValue = {
  state: PaletteState
  dispatch: React.Dispatch<PaletteAction>
}

export type SerializablePaletteState = Omit<PaletteState, 'currentGeneratorMethod' | 'valueType'>

export type PaletteStateInput = Pick<SerializablePaletteState, 'baseColor' | 'colors'> &
  Partial<Omit<SerializablePaletteState, 'baseColor' | 'colors'>>

export type PaletteInitialState = Partial<PaletteState>
