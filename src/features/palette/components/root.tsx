import React from 'react'
import { paletteReducer } from '../palette.reducer'
import { hydratePaletteState } from '../utils/state'

import type { PaletteContextValue, PaletteInitialState } from '../types/state'

export const PaletteContext = React.createContext<PaletteContextValue | undefined>(undefined)

type PaletteRootProps = React.ComponentProps<'div'> & {
  initialState?: PaletteInitialState
  syncInitialState?: boolean
}

export const PaletteRoot = ({
  children,
  initialState,
  syncInitialState = false,
}: PaletteRootProps) => {
  const [state, dispatch] = React.useReducer(paletteReducer, initialState, hydratePaletteState)
  const syncedInitialState = React.useRef(initialState)

  React.useEffect(() => {
    if (!syncInitialState || syncedInitialState.current === initialState) return

    syncedInitialState.current = initialState
    dispatch({ type: 'SYNC_EXTERNAL_STATE', payload: initialState ?? {} })
  }, [initialState, syncInitialState])

  return <PaletteContext.Provider value={{ state, dispatch }}>{children}</PaletteContext.Provider>
}
