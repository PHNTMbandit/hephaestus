import { cn } from 'dawn-ui-react'
import React from 'react'
import { typographyReducer } from '../typography.reducer'

import type { TypographyContextValue, TypographyState } from '../types/state'

type TypographyProviderProps = React.ComponentProps<'div'> & { initialState: TypographyState }

export const TypographyContext = React.createContext<TypographyContextValue | undefined>(undefined)

export const TypographyProvider = ({
  initialState,
  className,
  children,
  ref,
  ...props
}: TypographyProviderProps) => {
  const [state, dispatch] = React.useReducer(typographyReducer, initialState)

  return (
    <TypographyContext.Provider value={{ state, dispatch }}>
      <div className={cn('', className)} ref={ref} {...props}>
        {children}
      </div>
    </TypographyContext.Provider>
  )
}

export const useTypography = (): TypographyContextValue => {
  const context = React.useContext(TypographyContext)

  if (!context) {
    throw new Error('useTypography must be used within a TypographyProvider')
  }

  return context
}
