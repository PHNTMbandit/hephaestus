import { describe, expect, it } from 'vitest'
import { paletteReducer } from '../palette.reducer'
import { paletteGeneratorMethods } from '../utils/generator-methods'

import type { Color } from '../../color/color.types'
import type { PaletteState } from '../types/state'

const makeColors = (): Color[] => [
  { id: 'a', value: '#ff0000', locked: false },
  { id: 'b', value: '#00ff00', locked: false },
  { id: 'c', value: '#0000ff', locked: false },
]

const makeState = (overrides: Partial<PaletteState> = {}): PaletteState => ({
  undoActions: [],
  redoActions: [],
  colors: makeColors(),
  valueType: {
    value: 'hex',
    label: 'HEX',
    displayColor: (color) => color,
    getColorClipboardFormat: (color) => color,
  },
  baseColor: '#ff0000',
  currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
  limit: 10,
  mode: 'list',
  ...overrides,
})

describe('paletteReducer color mutations', () => {
  it('ADD appends a color and records history', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'ADD' })

    expect(next.colors).toHaveLength(4)
    expect(next.undoActions).toHaveLength(1)
    expect(next.undoActions[0].label).toBe('Add Color')
    expect(next.redoActions).toHaveLength(0)
  })

  it('ADD does nothing when the limit is reached', () => {
    const state = makeState({ limit: 3 })
    const next = paletteReducer(state, { type: 'ADD' })

    expect(next).toBe(state)
  })

  it('ADD_AT inserts a color after the given index', () => {
    const state = makeState()
    const inserted: Color = { id: 'x', value: '#ffffff', locked: false }
    const next = paletteReducer(state, { type: 'ADD_AT', payload: { index: 0, color: inserted } })

    expect(next.colors.map((color) => color.id)).toStrictEqual(['a', 'x', 'b', 'c'])
  })

  it('REMOVE drops the last color', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'REMOVE' })

    expect(next.colors.map((color) => color.id)).toStrictEqual(['a', 'b'])
  })

  it('REMOVE_AT drops the color at the index', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'REMOVE_AT', payload: { index: 1 } })

    expect(next.colors.map((color) => color.id)).toStrictEqual(['a', 'c'])
  })

  it('UPDATE changes the value of the matching color', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'UPDATE', payload: { id: 'b', hex: '#123456' } })

    expect(next.colors.find((color) => color.id === 'b')?.value).toBe('#123456')
  })

  it('REORDER replaces the colors with the provided order', () => {
    const state = makeState()
    const reordered = [...state.colors].reverse()
    const next = paletteReducer(state, { type: 'REORDER', payload: { newColors: reordered } })

    expect(next.colors.map((color) => color.id)).toStrictEqual(['c', 'b', 'a'])
  })
})

describe('paletteReducer locking', () => {
  it('LOCK marks a color as locked', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'LOCK', payload: { id: 'a' } })

    expect(next.colors.find((color) => color.id === 'a')?.locked).toBe(true)
  })

  it('UNLOCK clears the locked flag', () => {
    const state = makeState({
      colors: [{ id: 'a', value: '#ff0000', locked: true }],
    })
    const next = paletteReducer(state, { type: 'UNLOCK', payload: { id: 'a' } })

    expect(next.colors[0].locked).toBe(false)
  })

  it('GENERATE preserves locked colors', () => {
    const locked: Color = { id: 'a', value: '#ff0000', locked: true }
    const state = makeState({ colors: [locked, { id: 'b', value: '#00ff00', locked: false }] })
    const next = paletteReducer(state, { type: 'GENERATE' })

    expect(next.colors[0]).toStrictEqual(locked)
    expect(next.colors).toHaveLength(2)
    expect(next.undoActions[0].label).toBe('Generate Palette')
  })
})

describe('paletteReducer settings', () => {
  it('SET_GENERATOR_METHOD swaps the active method by id', () => {
    const state = makeState()
    const next = paletteReducer(state, {
      type: 'SET_GENERATOR_METHOD',
      payload: { id: 'complementary' },
    })

    expect(next.currentGeneratorMethod.id).toBe('complementary')
  })

  it('SET_VALUE_TYPE swaps the active value type', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'SET_VALUE_TYPE', payload: { valueType: 'rgb' } })

    expect(next.valueType.value).toBe('rgb')
  })

  it('SET_LIMIT trims colors beyond the new limit', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'SET_LIMIT', payload: { limit: 2 } })

    expect(next.limit).toBe(2)
    expect(next.colors).toHaveLength(2)
  })

  it('SET_MODE switches the view mode', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'SET_MODE', payload: { mode: 'preview' } })

    expect(next.mode).toBe('preview')
  })

  it('RESET replaces colors and base color', () => {
    const state = makeState()
    const replacement: Color[] = [{ id: 'z', value: '#abcdef', locked: false }]
    const next = paletteReducer(state, {
      type: 'RESET',
      payload: { colors: replacement, baseColor: '#abcdef' },
    })

    expect(next.colors).toStrictEqual(replacement)
    expect(next.baseColor).toBe('#abcdef')
    expect(next.undoActions[0].label).toBe('Reset Palette')
  })
})

describe('paletteReducer history', () => {
  it('UNDO restores the previous snapshot and enables REDO', () => {
    const state = makeState()
    const added = paletteReducer(state, { type: 'ADD' })
    const undone = paletteReducer(added, { type: 'UNDO' })

    expect(undone.colors).toStrictEqual(state.colors)
    expect(undone.undoActions).toHaveLength(0)
    expect(undone.redoActions).toHaveLength(1)
  })

  it('REDO reapplies an undone snapshot', () => {
    const state = makeState()
    const added = paletteReducer(state, { type: 'ADD' })
    const undone = paletteReducer(added, { type: 'UNDO' })
    const redone = paletteReducer(undone, { type: 'REDO' })

    expect(redone.colors).toStrictEqual(added.colors)
    expect(redone.undoActions).toHaveLength(1)
    expect(redone.redoActions).toHaveLength(0)
  })

  it('UNDO is a no-op when there is no history', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'UNDO' })

    expect(next).toBe(state)
  })

  it('REDO is a no-op when there is nothing to redo', () => {
    const state = makeState()
    const next = paletteReducer(state, { type: 'REDO' })

    expect(next).toBe(state)
  })
})
