import { valueTypesList } from './constants/values'
import { generateRandomColor } from './utils/color-generators'
import { paletteGeneratorMethodsList } from './utils/generator-methods'
import { recordHistory } from './utils/history'

import type { PaletteAction, PaletteState } from './types/state'

export const paletteReducer = (state: PaletteState, action: PaletteAction): PaletteState => {
  switch (action.type) {
    case 'ADD': {
      if (state.colors.length >= state.limit) return state
      const palette = state.currentGeneratorMethod.generatePalette(
        state.baseColor,
        state.colors.length + 1,
      )
      const colors = [...state.colors, palette[palette.length - 1]]

      return {
        ...state,
        ...recordHistory(state, 'Add Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'ADD_AT': {
      if (state.colors.length >= state.limit) return state
      const colors = [
        ...state.colors.slice(0, action.payload.index + 1),
        action.payload.color,
        ...state.colors.slice(action.payload.index + 1),
      ]

      return {
        ...state,
        ...recordHistory(state, 'Add Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'REMOVE': {
      const colors = state.colors.slice(0, -1)

      return {
        ...state,
        ...recordHistory(state, 'Remove Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'REMOVE_AT': {
      const colors = [
        ...state.colors.slice(0, action.payload.index),
        ...state.colors.slice(action.payload.index + 1),
      ]

      return {
        ...state,
        ...recordHistory(state, 'Remove Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'UPDATE': {
      const colors = state.colors.map((color) =>
        color.id === action.payload.id ? { ...color, value: action.payload.hex } : color,
      )

      return {
        ...state,
        ...recordHistory(state, 'Update Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'GENERATE': {
      const newBaseColor = generateRandomColor().value
      const colors = state.colors.map((color, index) =>
        color.locked
          ? color
          : state.currentGeneratorMethod.generate(newBaseColor, index, state.colors.length),
      )

      return {
        ...state,
        ...recordHistory(state, 'Generate Palette', { colors, baseColor: newBaseColor }),
      }
    }
    case 'RESET': {
      return {
        ...state,
        ...recordHistory(state, 'Reset Palette', {
          colors: action.payload.colors,
          baseColor: action.payload.baseColor,
        }),
      }
    }
    case 'LOCK': {
      const colors = state.colors.map((color) =>
        color.id === action.payload.id ? { ...color, locked: true } : color,
      )

      return {
        ...state,
        ...recordHistory(state, 'Lock Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'UNLOCK': {
      const colors = state.colors.map((color) =>
        color.id === action.payload.id ? { ...color, locked: false } : color,
      )

      return {
        ...state,
        ...recordHistory(state, 'Unlock Color', { colors, baseColor: state.baseColor }),
      }
    }
    case 'REORDER': {
      return {
        ...state,
        ...recordHistory(state, 'Reorder Colors', {
          colors: action.payload.newColors,
          baseColor: state.baseColor,
        }),
      }
    }
    case 'SET_GENERATOR_METHOD':
      return {
        ...state,
        currentGeneratorMethod: paletteGeneratorMethodsList.find(
          (method) => method.id === action.payload.id,
        )!,
      }
    case 'SET_BASE_COLOR': {
      const colors = state.currentGeneratorMethod
        .generatePalette(action.payload.baseColor, state.limit)
        .slice(0, state.colors.length)

      return {
        ...state,
        ...recordHistory(state, 'Set Base Color', {
          colors,
          baseColor: action.payload.baseColor,
        }),
      }
    }
    case 'SET_COLORS':
      return {
        ...state,
        ...recordHistory(state, 'Set Colors', {
          colors: action.payload.colors.slice(0, state.limit),
          baseColor: state.baseColor,
        }),
        colors: action.payload.colors.slice(0, state.limit),
      }
    case 'SET_IS_SAVING':
      return {
        ...state,
        saving: action.payload.saving,
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
    case 'UNDO': {
      const command = state.undoActions[state.undoActions.length - 1]
      if (!command) return state

      return {
        ...state,
        colors: command.before.colors,
        baseColor: command.before.baseColor,
        undoActions: state.undoActions.slice(0, -1),
        redoActions: [...state.redoActions, command],
      }
    }
    case 'REDO': {
      const command = state.redoActions[state.redoActions.length - 1]
      if (!command) return state

      return {
        ...state,
        colors: command.after.colors,
        baseColor: command.after.baseColor,
        undoActions: [...state.undoActions, command],
        redoActions: state.redoActions.slice(0, -1),
      }
    }
    default:
      return state
  }
}
