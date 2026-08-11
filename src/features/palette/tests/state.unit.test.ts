import { describe, expect, it } from 'vitest'
import { PALETTE_CONFIG } from '../constants/state'
import { hydratePaletteState, serializePaletteState } from '../utils/state'

const colors = [{ id: 'red', value: '#ff0000', locked: false }]

describe('palette state serialization', () => {
  it('hydrates an unsaved palette with editor defaults', () => {
    const state = hydratePaletteState({ baseColor: '#ff0000', colors })

    expect(state.limit).toBe(PALETTE_CONFIG.DEFAULT_LIMIT)
    expect(state.mode).toBe(PALETTE_CONFIG.DEFAULT_MODE)
    expect(serializePaletteState(state)).toStrictEqual({
      baseColor: '#ff0000',
      colors,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
      undoActions: [],
      redoActions: [],
    })
  })

  it('preserves metadata when hydrating a saved palette', () => {
    const savedPalette = {
      id: 'palette-id',
      userId: 'user-id',
      createdAt: '2026-08-06T00:00:00.000Z',
      updatedAt: '2026-08-06T01:00:00.000Z',
      name: 'Brand palette',
      baseColor: '#ff0000',
      colors,
    }

    const serialized = serializePaletteState(hydratePaletteState(savedPalette))

    expect(serialized).toStrictEqual({
      ...savedPalette,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
      undoActions: [],
      redoActions: [],
    })
    expect(serialized).not.toHaveProperty('currentGeneratorMethod')
    expect(serialized).not.toHaveProperty('valueType')
  })
})
