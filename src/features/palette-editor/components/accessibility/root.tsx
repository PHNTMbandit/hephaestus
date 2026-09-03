import React from 'react'
import { usePalette } from '#/features/palette/hooks/use-palette'

import type { Color } from '#/features/color/color.types'

export type PaletteEditorAccessibilityContextValue = {
  background: Color
  foreground: Color
  setBackground: (color: Color) => void
  setForeground: (color: Color) => void
}

export const PaletteEditorAccessibilityContext = React.createContext<
  PaletteEditorAccessibilityContextValue | undefined
>(undefined)

type PaletteEditorAccessibilityRootProps = {
  children: React.ReactNode
}

export const PaletteEditorAccessibilityRoot = ({
  children,
}: PaletteEditorAccessibilityRootProps) => {
  const {
    state: { colors },
  } = usePalette()

  const [background, setBackground] = React.useState<Color>(colors[0])
  const [foreground, setForeground] = React.useState<Color>(colors[colors.length - 1])

  return (
    <PaletteEditorAccessibilityContext.Provider
      value={{ background, foreground, setBackground, setForeground }}
    >
      {children}
    </PaletteEditorAccessibilityContext.Provider>
  )
}
