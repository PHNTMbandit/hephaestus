import React from 'react'
import { PaletteEditorAccessibilityContext } from '../components/accessibility/root'

import type { PaletteEditorAccessibilityContextValue } from '../components/accessibility/root'

export const usePaletteAccessibility = (): PaletteEditorAccessibilityContextValue => {
  const context = React.useContext(PaletteEditorAccessibilityContext)

  if (!context) {
    throw new Error('usePaletteAccessibility must be used within a PaletteAccessibilityRoot')
  }

  return context
}
