import { describe, expect, it } from 'vitest'
import { defaultPaletteState } from '../constants/state'

import type { PaletteState } from '../types/state'
import type { PaletteSnapshot } from '../utils'

describe('palette state history', () => {
  it('should record history when adding a color', () => {
    const palette: PaletteState = { ...defaultPaletteState }

    const snapshot: PaletteSnapshot = {
      colors: [{ id: 'red', value: '#ff0000', locked: false }],
      baseColor: '#ff0000',
    }

    const newState: PaletteState = {
      ...palette,
      colors: snapshot.colors,
      baseColor: snapshot.baseColor,
      undoActions: [
        {
          label: 'Add Color',
          before: {
            colors: palette.colors,
            baseColor: palette.baseColor,
          },
          after: {
            colors: snapshot.colors,
            baseColor: snapshot.baseColor,
          },
        },
      ],
    }

    expect(newState.undoActions.length).toBe(1)
    expect(newState.undoActions[0].label).toBe('Add Color')
    expect(newState.undoActions[0].before.colors).toEqual(palette.colors)
    expect(newState.undoActions[0].after.colors).toEqual(snapshot.colors)
  })
  it('should record history when removing a color', () => {
    const palette: PaletteState = {
      ...defaultPaletteState,
      colors: [
        { id: 'red', value: '#ff0000', locked: false },
        { id: 'green', value: '#00ff00', locked: false },
      ],
    }

    const snapshot: PaletteSnapshot = {
      colors: [{ id: 'red', value: '#ff0000', locked: false }],
      baseColor: '#ff0000',
    }

    const newState: PaletteState = {
      ...palette,
      colors: snapshot.colors,
      baseColor: snapshot.baseColor,
      undoActions: [
        {
          label: 'Remove Color',
          before: {
            colors: palette.colors,
            baseColor: palette.baseColor,
          },
          after: {
            colors: snapshot.colors,
            baseColor: snapshot.baseColor,
          },
        },
      ],
    }

    expect(newState.undoActions.length).toBe(1)
    expect(newState.undoActions[0].label).toBe('Remove Color')
    expect(newState.undoActions[0].before.colors).toEqual(palette.colors)
    expect(newState.undoActions[0].after.colors).toEqual(snapshot.colors)
  })
  it('should record history when updating a color', () => {
    const palette: PaletteState = {
      ...defaultPaletteState,
      colors: [{ id: 'red', value: '#ff0000', locked: false }],
    }

    const snapshot: PaletteSnapshot = {
      colors: [{ id: 'red', value: '#00ff00', locked: false }],
      baseColor: '#ff0000',
    }

    const newState: PaletteState = {
      ...palette,
      colors: snapshot.colors,
      baseColor: snapshot.baseColor,
      undoActions: [
        {
          label: 'Update Color',
          before: {
            colors: palette.colors,
            baseColor: palette.baseColor,
          },
          after: {
            colors: snapshot.colors,
            baseColor: snapshot.baseColor,
          },
        },
      ],
    }

    expect(newState.undoActions.length).toBe(1)
    expect(newState.undoActions[0].label).toBe('Update Color')
    expect(newState.undoActions[0].before.colors).toEqual(palette.colors)
    expect(newState.undoActions[0].after.colors).toEqual(snapshot.colors)
  })
})
