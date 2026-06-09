import { defaultTypographyState } from './constants/state'

import type { TypographyAction, TypographyState } from './types/state'

export const typographyReducer = (
  state: TypographyState,
  action: TypographyAction,
): TypographyState => {
  switch (action.type) {
    case 'SET_SCALE':
      return {
        ...state,
        scale: action.payload.scale,
      }
    case 'SET_FONT_STYLE':
      return {
        ...state,
        fontStyle: action.payload.fontStyle,
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
    case 'SET_LINE_HEIGHT':
      return {
        ...state,
        lineHeight: action.payload.lineHeight,
      }
    case 'SET_LETTER_SPACING':
      return {
        ...state,
        letterSpacing: action.payload.letterSpacing,
      }
    case 'SET_COLOUR':
      return {
        ...state,
        colour: action.payload.colour,
      }
    case 'SET_BACKGROUND':
      return {
        ...state,
        background: action.payload.background,
      }
    case 'RESET':
      return defaultTypographyState
    default:
      return state
  }
}
