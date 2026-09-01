import React from 'react'
import { PaletteContext } from '../components/root'

import type { PaletteContextValue } from '../types/state'

export const usePalette = (): PaletteContextValue => {
  const context = React.useContext(PaletteContext)

  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider')
  }

  return context
}
