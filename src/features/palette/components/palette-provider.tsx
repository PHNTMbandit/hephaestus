import { cn } from 'dawn-ui-react'
import React from 'react'
import { paletteReducer } from '../palette.reducer'

import type { PaletteContextValue, PaletteState } from '../palette.types'

export const PaletteContext = React.createContext<PaletteContextValue | undefined>(undefined)

type PaletteProviderProps = React.ComponentProps<'div'> & {
  initialState: PaletteState
}

export const PaletteProvider = ({
  className,
  children,
  ref,
  initialState,
  ...props
}: PaletteProviderProps) => {
  const [state, dispatch] = React.useReducer(paletteReducer, initialState)

  return (
    <PaletteContext.Provider value={{ state, dispatch }}>
      <div
        className={cn('flex size-full flex-col overflow-hidden', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </PaletteContext.Provider>
  )
}
