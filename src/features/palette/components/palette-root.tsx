import React from 'react'
import { paletteReducer } from '../palette.reducer'
import { hydratePaletteState } from '../utils/state'

import type { PaletteContextValue, PaletteInitialState } from '../types/state'

export const PaletteContext = React.createContext<PaletteContextValue | undefined>(undefined)

type PaletteRootProps = React.ComponentProps<'div'> & {
  initialState?: PaletteInitialState
}

export const PaletteRoot = ({ children, initialState }: PaletteRootProps) => {
  const [state, dispatch] = React.useReducer(paletteReducer, initialState, hydratePaletteState)

  return <PaletteContext.Provider value={{ state, dispatch }}>{children}</PaletteContext.Provider>
}
