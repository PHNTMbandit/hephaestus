import React from 'react'
import { usePalette } from '../hooks/use-palette'

import type { Color } from '#/features/color/color.types'

export type PaletteAccessibilityContextValue = {
  background: Color
  foreground: Color
  setBackground: (color: Color) => void
  setForeground: (color: Color) => void
}

export const PaletteAccessibilityContext = React.createContext<
  PaletteAccessibilityContextValue | undefined
>(undefined)

type PaletteAccessibilityRootProps = {
  children: React.ReactNode
}

export const PaletteAccessibilityRoot = ({ children }: PaletteAccessibilityRootProps) => {
  const {
    state: { colors },
  } = usePalette()

  const [background, setBackground] = React.useState<Color>(colors[0])
  const [foreground, setForeground] = React.useState<Color>(colors[colors.length - 1])

  return (
    <PaletteAccessibilityContext.Provider
      value={{ background, foreground, setBackground, setForeground }}
    >
      {children}
    </PaletteAccessibilityContext.Provider>
  )
}
