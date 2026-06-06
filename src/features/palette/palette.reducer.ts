import {
  generateRandomColour,
  paletteGeneratorMethodsList,
  valueTypes,
  valueTypesList,
} from './utils'

import type { PaletteAction, PaletteState } from './palette.types'

export const paletteReducer = (state: PaletteState, action: PaletteAction): PaletteState => {
  switch (action.type) {
    case 'ADD':
      if (state.colours.length >= state.limit) return state
      const palette = state.currentGeneratorMethod.generatePalette(
        state.baseColour,
        state.colours.length + 1,
      )

      return {
        ...state,
        colours: [...state.colours, palette[palette.length - 1]],
      }
    case 'ADD_AT':
      if (state.colours.length >= state.limit) return state
      return {
        ...state,
        colours: [
          ...state.colours.slice(0, action.payload.index + 1),
          action.payload.colour,
          ...state.colours.slice(action.payload.index + 1),
        ],
      }
    case 'REMOVE':
      return {
        ...state,
        colours: state.colours.slice(0, -1),
      }
    case 'REMOVE_AT':
      return {
        ...state,
        colours: [
          ...state.colours.slice(0, action.payload.index),
          ...state.colours.slice(action.payload.index + 1),
        ],
      }
    case 'UPDATE':
      return {
        ...state,
        colours: state.colours.map((colour) =>
          colour.id === action.payload.id ? { ...colour, value: action.payload.hex } : colour,
        ),
      }
    case 'GENERATE':
      const newBaseColour = generateRandomColour().value
      return {
        ...state,
        baseColour: newBaseColour,
        colours: state.colours.map((colour, index) =>
          colour.locked
            ? colour
            : state.currentGeneratorMethod.generate(newBaseColour, index, state.colours.length),
        ),
      }
    case 'RECALIBRATE':
      return {
        ...state,
        colours: state.colours.map((colour, index) =>
          colour.locked
            ? colour
            : state.currentGeneratorMethod.generate(state.baseColour, index, state.colours.length),
        ),
      }
    case 'LOCK':
      return {
        ...state,
        colours: state.colours.map((colour) =>
          colour.id === action.payload.id ? { ...colour, locked: true } : colour,
        ),
      }
    case 'UNLOCK':
      return {
        ...state,
        colours: state.colours.map((colour) =>
          colour.id === action.payload.id ? { ...colour, locked: false } : colour,
        ),
      }
    case 'REORDER':
      return {
        ...state,
        colours: action.payload.newColours,
      }
    case 'SET_GENERATOR_METHOD':
      return {
        ...state,
        currentGeneratorMethod: paletteGeneratorMethodsList.find(
          (method) => method.id === action.payload.id,
        )!,
        colours: paletteGeneratorMethodsList
          .find((method) => method.id === action.payload.id)!
          .generatePalette(state.baseColour, state.colours.length),
      }
    case 'SET_BASE_COLOUR':
      return {
        ...state,
        baseColour: action.payload.baseColour,
        colours: state.currentGeneratorMethod
          .generatePalette(action.payload.baseColour, state.limit)
          .slice(0, state.colours.length),
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
        colours: state.colours.slice(0, action.payload.limit),
      }
    case 'RESET':
      return {
        ...state,
        baseColour: '#ff0000',
        colours: state.currentGeneratorMethod.generatePalette('#ff0000', state.limit),
        valueType: valueTypes.hex,
      }
    default:
      return state
  }
}
