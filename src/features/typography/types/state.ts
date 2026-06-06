import type { WebFont } from './font-family'
import type { FontWeight } from './font-weight'
import type { TypeScale } from './type-scale'

export type TypographyState = {
  fontStyle: WebFont
  fontSize: number
  scale: TypeScale
  fontWeight: FontWeight
  lineHeight: number
  letterSpacing: number
  colour: string
  background: string
}

export type TypographyAction =
  | { type: 'SET_SCALE'; payload: { scale: TypeScale } }
  | { type: 'SET_FONT_STYLE'; payload: { fontStyle: WebFont } }
  | { type: 'SET_FONT_SIZE'; payload: { fontSize: number } }
  | { type: 'SET_FONT_WEIGHT'; payload: { fontWeight: FontWeight } }
  | { type: 'SET_LINE_HEIGHT'; payload: { lineHeight: number } }
  | { type: 'SET_LETTER_SPACING'; payload: { letterSpacing: number } }
  | { type: 'SET_COLOUR'; payload: { colour: string } }
  | { type: 'SET_BACKGROUND'; payload: { background: string } }
  | { type: 'RESET' }

export type TypographyContextValue = {
  state: TypographyState
  dispatch: React.Dispatch<TypographyAction>
}
