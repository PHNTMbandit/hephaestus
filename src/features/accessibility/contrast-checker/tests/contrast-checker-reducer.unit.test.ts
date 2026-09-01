import { describe, expect, it } from 'vitest'
import { contrastCheckerReducer } from '../contrast-checker.reducer'

import type { ContrastCheckerState } from '../types/state'

const baseState: ContrastCheckerState = {
  foregroundColor: '#000000',
  foregroundPalette: ['#000000'],
  backgroundColor: '#ffffff',
  backgroundPalette: ['#ffffff'],
  contrastMethod: 'WCAG2',
  contrastScore: 21,
  fontSize: 16,
  fontWeight: 400,
}

describe('contrastCheckerReducer', () => {
  it('sets the foreground color and recomputes the score', () => {
    const next = contrastCheckerReducer(baseState, {
      type: 'SET_FOREGROUND_COLOR',
      payload: { color: '#ffffff' },
    })

    expect(next.foregroundColor).toBe('#ffffff')
    expect(next.contrastScore).toBeCloseTo(1, 5)
  })

  it('sets the background color and recomputes the score', () => {
    const next = contrastCheckerReducer(baseState, {
      type: 'SET_BACKGROUND_COLOR',
      payload: { color: '#000000' },
    })

    expect(next.backgroundColor).toBe('#000000')
    expect(next.contrastScore).toBeCloseTo(1, 5)
  })

  it('recomputes the score when the method changes to APCA', () => {
    const next = contrastCheckerReducer(baseState, {
      type: 'SET_CONTRAST_METHOD',
      payload: { contrastMethod: 'APCA' },
    })

    expect(next.contrastMethod).toBe('APCA')
    expect(next.contrastScore).toBeGreaterThan(100)
  })

  it('swaps colors and palettes and recomputes the score', () => {
    const next = contrastCheckerReducer(baseState, { type: 'SWAP_COLORS' })

    expect(next.foregroundColor).toBe('#ffffff')
    expect(next.backgroundColor).toBe('#000000')
    expect(next.foregroundPalette).toStrictEqual(['#ffffff'])
    expect(next.backgroundPalette).toStrictEqual(['#000000'])
    expect(next.contrastScore).toBeCloseTo(21, 5)
  })

  it('stores the foreground and background palettes', () => {
    const withForeground = contrastCheckerReducer(baseState, {
      type: 'SET_FOREGROUND_PALETTE',
      payload: { palette: ['#111111', '#222222'] },
    })
    const withBackground = contrastCheckerReducer(withForeground, {
      type: 'SET_BACKGROUND_PALETTE',
      payload: { palette: ['#eeeeee'] },
    })

    expect(withBackground.foregroundPalette).toStrictEqual(['#111111', '#222222'])
    expect(withBackground.backgroundPalette).toStrictEqual(['#eeeeee'])
  })

  it('updates font size and weight without touching the score', () => {
    const sized = contrastCheckerReducer(baseState, {
      type: 'SET_FONT_SIZE',
      payload: { fontSize: 24 },
    })
    const weighted = contrastCheckerReducer(sized, {
      type: 'SET_FONT_WEIGHT',
      payload: { fontWeight: 700 },
    })

    expect(weighted.fontSize).toBe(24)
    expect(weighted.fontWeight).toBe(700)
    expect(weighted.contrastScore).toBe(baseState.contrastScore)
  })

  it('returns the same state for an unknown action', () => {
    const next = contrastCheckerReducer(baseState, {
      // @ts-expect-error exercising the default branch
      type: 'UNKNOWN',
    })

    expect(next).toBe(baseState)
  })
})
