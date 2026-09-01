import type { ContrastMethod } from '#/features/accessibility/types/methods'

export type ContrastCheckerState = {
  foregroundColor: string
  foregroundPalette: string[]
  backgroundColor: string
  backgroundPalette: string[]
  contrastMethod: ContrastMethod
  contrastScore: number
  fontSize: number
  fontWeight: number
}

export type ContrastCheckerAction =
  | { type: 'SET_FOREGROUND_COLOR'; payload: { color: string } }
  | { type: 'SET_FOREGROUND_PALETTE'; payload: { palette: string[] } }
  | { type: 'SET_BACKGROUND_COLOR'; payload: { color: string } }
  | { type: 'SET_BACKGROUND_PALETTE'; payload: { palette: string[] } }
  | { type: 'SET_CONTRAST_METHOD'; payload: { contrastMethod: ContrastMethod } }
  | { type: 'SET_CONTRAST_SCORE'; payload: { contrastScore: number } }
  | { type: 'SET_FONT_SIZE'; payload: { fontSize: number } }
  | { type: 'SET_FONT_WEIGHT'; payload: { fontWeight: number } }
  | { type: 'SWAP_COLORS' }

export type ContrastCheckerContextValue = {
  state: ContrastCheckerState
  dispatch: React.Dispatch<ContrastCheckerAction>
}
