import { cn } from 'dawn-ui-react'
import React from 'react'

import type { Colour } from '#/features/palette/palette.types.ts'
import type { ColourContextValue } from '../colour.types'

export const ColourContext = React.createContext<ColourContextValue | undefined>(undefined)

type ColourProviderProps = React.ComponentProps<'div'> & {
  colour: Colour
}

export const ColourProvider = ({
  colour,
  className,
  children,
  ref,
  ...props
}: ColourProviderProps) => {
  return (
    <ColourContext.Provider value={{ colour }}>
      <div className={cn('size-full', className)} ref={ref} {...props}>
        {children}
      </div>
    </ColourContext.Provider>
  )
}

export const useColour = () => {
  const context = React.useContext(ColourContext)

  if (!context) {
    throw new Error('useColour must be used within a ColourProvider')
  }

  return context
}
