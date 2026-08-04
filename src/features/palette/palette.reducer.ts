import { generateRandomColor, paletteGeneratorMethodsList, valueTypesList } from './utils'

import type { PaletteAction, PaletteState } from './types/state'

export const paletteReducer = (state: PaletteState, action: PaletteAction): PaletteState => {
  switch (action.type) {
    case 'ADD':
      if (state.colors.length >= state.limit) return state
      const palette = state.currentGeneratorMethod.generatePalette(
        state.baseColor,
        state.colors.length + 1,
      )

      return {
        ...state,
        colors: [...state.colors, palette[palette.length - 1]],
      }
    case 'ADD_AT':
      if (state.colors.length >= state.limit) return state
      return {
        ...state,
        colors: [
          ...state.colors.slice(0, action.payload.index + 1),
          action.payload.color,
          ...state.colors.slice(action.payload.index + 1),
        ],
      }
    case 'REMOVE':
      return {
        ...state,
        colors: state.colors.slice(0, -1),
      }
    case 'REMOVE_AT':
      return {
        ...state,
        colors: [
          ...state.colors.slice(0, action.payload.index),
          ...state.colors.slice(action.payload.index + 1),
        ],
      }
    case 'UPDATE':
      return {
        ...state,
        colors: state.colors.map((color) =>
          color.id === action.payload.id ? { ...color, value: action.payload.hex } : color,
        ),
      }
    case 'GENERATE':
      const newBaseColor = generateRandomColor().value
      return {
        ...state,
        baseColor: newBaseColor,
        colors: state.colors.map((color, index) =>
          color.locked
            ? color
            : state.currentGeneratorMethod.generate(newBaseColor, index, state.colors.length),
        ),
      }
    case 'RESET':
      return {
        ...state,
        baseColor: action.payload.baseColor,
        colors: action.payload.colors,
      }
    case 'LOCK':
      return {
        ...state,
        colors: state.colors.map((color) =>
          color.id === action.payload.id ? { ...color, locked: true } : color,
        ),
      }
    case 'UNLOCK':
      return {
        ...state,
        colors: state.colors.map((color) =>
          color.id === action.payload.id ? { ...color, locked: false } : color,
        ),
      }
    case 'REORDER':
      return {
        ...state,
        colors: action.payload.newColors,
      }
    case 'SET_GENERATOR_METHOD':
      return {
        ...state,
        currentGeneratorMethod: paletteGeneratorMethodsList.find(
          (method) => method.id === action.payload.id,
        )!,
      }
    case 'SET_BASE_COLOR':
      return {
        ...state,
        baseColor: action.payload.baseColor,
        colors: state.currentGeneratorMethod
          .generatePalette(action.payload.baseColor, state.limit)
          .slice(0, state.colors.length),
      }
    case 'SET_VALUE_TYPE':
      return {
        ...state,
        valueType: valueTypesList.find((vt) => vt.value === action.payload.valueType)!,
      }
    case 'SET_LIMIT':
      return {
        ...state,
        limit: action.payload.limit,
        colors: state.colors.slice(0, action.payload.limit),
      }
    case 'SET_MODE': {
      return {
        ...state,
        mode: action.payload.mode,
      }
    }
    default:
      return state
  }
}
