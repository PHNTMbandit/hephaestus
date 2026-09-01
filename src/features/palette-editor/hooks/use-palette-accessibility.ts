import React from 'react'
import { PaletteAccessibilityContext } from '../components/accessibility/root'

import type { PaletteAccessibilityContextValue } from '../components/accessibility/root'

export const usePaletteAccessibility = (): PaletteAccessibilityContextValue => {
  const context = React.useContext(PaletteAccessibilityContext)

  if (!context) {
    throw new Error('usePaletteAccessibility must be used within a PaletteAccessibilityRoot')
  }

  return context
}
