import { cn } from 'dawn-ui-react'
import React from 'react'
import { hydratePaletteState } from '../utils/state'
import { PaletteRoot } from './root'

import type { PaletteInitialState } from '../types/state'

type PaletteCardProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  palette: PaletteInitialState & { name?: string; description?: string }
  children?: React.ReactNode
}

export const PaletteCard = ({ palette, className, children, ref, ...props }: PaletteCardProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PaletteRoot initialState={hydratePaletteState(palette)}>
        <div className={cn('flex flex-col gap-3xs', className)} ref={ref} {...props}>
          {children}
        </div>
      </PaletteRoot>
    </React.Suspense>
  )
}
