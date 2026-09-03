import { cn } from 'dawn-ui-react'
import React from 'react'

import type { Color, ColorContextValue } from '../color.types'

export const ColorContext = React.createContext<ColorContextValue | undefined>(undefined)

type ColorProviderProps = Omit<React.ComponentProps<'div'>, 'color'> & {
  color: Color
}

export const ColorProvider = ({
  color,
  className,
  children,
  ref,
  ...props
}: ColorProviderProps) => {
  return (
    <ColorContext.Provider value={{ color }}>
      <div className={cn('size-full', className)} ref={ref} {...props}>
        {children}
      </div>
    </ColorContext.Provider>
  )
}

export const useColor = () => {
  const context = React.useContext(ColorContext)

  if (!context) {
    throw new Error('useColor must be used within a ColorProvider')
  }

  return context
}
