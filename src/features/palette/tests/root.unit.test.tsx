import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PaletteRoot } from '../components/root'
import { usePalette } from '../hooks/use-palette'

import type { PaletteInitialState } from '../types/state'

const firstPalette: PaletteInitialState = {
  colors: [{ id: 'color', value: '#ff0000', locked: false }],
}

const updatedPalette: PaletteInitialState = {
  colors: [{ id: 'color', value: '#00ff00', locked: false }],
}

const ColorValue = () => {
  const {
    state: { colors },
  } = usePalette()

  return <output>{colors[0]?.value}</output>
}

describe('PaletteRoot', () => {
  it('synchronizes reducer state when external state changes', async () => {
    const { rerender } = render(
      <PaletteRoot initialState={firstPalette} syncInitialState>
        <ColorValue />
      </PaletteRoot>,
    )

    rerender(
      <PaletteRoot initialState={updatedPalette} syncInitialState>
        <ColorValue />
      </PaletteRoot>,
    )

    await waitFor(() => expect(screen.getByText('#00ff00')).toBeInTheDocument())
  })

  it('preserves local reducer state by default', () => {
    const { rerender } = render(
      <PaletteRoot initialState={firstPalette}>
        <ColorValue />
      </PaletteRoot>,
    )

    rerender(
      <PaletteRoot initialState={updatedPalette}>
        <ColorValue />
      </PaletteRoot>,
    )

    expect(screen.getByText('#ff0000')).toBeInTheDocument()
  })
})
