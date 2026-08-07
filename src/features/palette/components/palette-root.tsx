import React from 'react'
import { paletteReducer } from '../palette.reducer'

import type { PaletteContextValue, PaletteState } from '../types/state'

export const PaletteContext = React.createContext<PaletteContextValue | undefined>(undefined)

type PaletteRootProps = React.ComponentProps<'div'> & {
  initialState: PaletteState
}

export const PaletteRoot = ({ children, initialState }: PaletteRootProps) => {
  const [state, dispatch] = React.useReducer(paletteReducer, initialState)

  return <PaletteContext.Provider value={{ state, dispatch }}>{children}</PaletteContext.Provider>
}
