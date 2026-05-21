import React from 'react'
import { PaletteContext } from '../components/palette-provider'

import type { PaletteContextValue } from '../palette.types'

export const usePalette = (): PaletteContextValue => {
  const context = React.useContext(PaletteContext)

  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider')
  }

  return context
}
