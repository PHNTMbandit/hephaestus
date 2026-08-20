import { getContrastAlgorithm } from './algorithms'

import type { ContrastCheckerAction } from './types/state'
import type { ContrastCheckerState } from './types/state'

export const contrastCheckerReducer = (
  state: ContrastCheckerState,
  action: ContrastCheckerAction,
): ContrastCheckerState => {
  switch (action.type) {
    case 'SET_FOREGROUND_COLOR':
      return {
        ...state,
        foregroundColor: action.payload.color,
        contrastScore: getContrastAlgorithm(state.contrastMethod).calculate(
          action.payload.color,
          state.backgroundColor,
        ),
      }
    case 'SET_BACKGROUND_COLOR':
      return {
        ...state,
        backgroundColor: action.payload.color,
        contrastScore: getContrastAlgorithm(state.contrastMethod).calculate(
          state.foregroundColor,
          action.payload.color,
        ),
      }
    case 'SET_FOREGROUND_PALETTE':
      return {
        ...state,
        foregroundPalette: action.payload.palette,
      }
    case 'SET_BACKGROUND_PALETTE':
      return {
        ...state,
        backgroundPalette: action.payload.palette,
      }
    case 'SET_CONTRAST_METHOD':
      return {
        ...state,
        contrastMethod: action.payload.contrastMethod,
        contrastScore: getContrastAlgorithm(action.payload.contrastMethod).calculate(
          state.foregroundColor,
          state.backgroundColor,
        ),
      }
    case 'SWAP_COLORS':
      return {
        ...state,
        foregroundColor: state.backgroundColor,
        backgroundColor: state.foregroundColor,
        foregroundPalette: state.backgroundPalette,
        backgroundPalette: state.foregroundPalette,
        contrastScore: getContrastAlgorithm(state.contrastMethod).calculate(
          state.backgroundColor,
          state.foregroundColor,
        ),
      }
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload.fontSize,
      }
    case 'SET_FONT_WEIGHT':
      return {
        ...state,
        fontWeight: action.payload.fontWeight,
      }
    default:
      return state
  }
}
