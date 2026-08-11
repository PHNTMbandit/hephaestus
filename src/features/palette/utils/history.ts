import type { Color } from '../../color/color.types'
import type { PaletteState } from '../types/state'

const MAX_HISTORY = 50

export type PaletteSnapshot = {
  colors: Color[]
  baseColor: string
}

export class PaletteCommand {
  label: string
  before: PaletteSnapshot
  after: PaletteSnapshot

  constructor(label: string, before: PaletteSnapshot, after: PaletteSnapshot) {
    this.label = label
    this.before = before
    this.after = after
  }
}

const snapshot = (state: PaletteState): PaletteSnapshot => ({
  colors: state.colors,
  baseColor: state.baseColor,
})

export const recordHistory = (
  state: PaletteState,
  label: string,
  next: PaletteSnapshot,
): Pick<PaletteState, 'colors' | 'baseColor' | 'undoActions' | 'redoActions'> => {
  const command = new PaletteCommand(label, snapshot(state), next)

  return {
    colors: next.colors,
    baseColor: next.baseColor,
    undoActions: [...state.undoActions, command].slice(-MAX_HISTORY),
    redoActions: [],
  }
}
