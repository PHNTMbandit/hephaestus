import React from 'react'
import { contrastCheckerReducer } from '../contrast-checker.reducer'

import type { ContrastCheckerContextValue, ContrastCheckerState } from '../types/state'

export const ContrastCheckerContext = React.createContext<ContrastCheckerContextValue | undefined>(
  undefined,
)

type ContrastCheckerRootProps = React.ComponentProps<'div'> & {
  initialState: ContrastCheckerState
}

export const ContrastCheckerRoot = ({ children, initialState }: ContrastCheckerRootProps) => {
  const [state, dispatch] = React.useReducer(contrastCheckerReducer, initialState)

  return (
    <ContrastCheckerContext.Provider value={{ state, dispatch }}>
      {children}
    </ContrastCheckerContext.Provider>
  )
}
