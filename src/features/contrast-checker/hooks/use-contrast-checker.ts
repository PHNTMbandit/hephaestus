import React from 'react'
import { ContrastCheckerContext } from '../components/contrast-checker-root'

import type { ContrastCheckerContextValue } from '../types/state'

export const useContrastChecker = (): ContrastCheckerContextValue => {
  const context = React.useContext(ContrastCheckerContext)

  if (!context) {
    throw new Error('useContrastChecker must be used within a ContrastCheckerProvider')
  }

  return context
}
