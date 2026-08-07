import { defaultPaletteState } from '../constants/state'

import type { PaletteState, PaletteStateInput, SerializablePaletteState } from '../types/state'

export function hydratePaletteState(data: PaletteStateInput): PaletteState {
  return {
    ...defaultPaletteState,
    ...data,
  }
}

export function serializePaletteState(state: PaletteState): SerializablePaletteState {
  return {
    baseColor: state.baseColor,
    colors: state.colors,
    limit: state.limit,
    mode: state.mode,
    ...(state.id !== undefined && { id: state.id }),
    ...(state.userId !== undefined && { userId: state.userId }),
    ...(state.createdAt !== undefined && { createdAt: state.createdAt }),
    ...(state.updatedAt !== undefined && { updatedAt: state.updatedAt }),
    ...(state.name !== undefined && { name: state.name }),
  }
}
