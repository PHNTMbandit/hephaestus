import { cn, Skeleton } from 'dawn-ui-react'
import React from 'react'
import { PaletteRoot } from './root'

import type { PaletteInitialState } from '../types/state'

type PaletteCardProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  palette: PaletteInitialState & { name?: string; description?: string }
  children?: React.ReactNode
}

export const PaletteCard = ({ palette, className, children, ref, ...props }: PaletteCardProps) => {
  return (
    <React.Suspense fallback={<Skeleton />}>
      <PaletteRoot initialState={palette} syncInitialState>
        <div
          className={cn('flex flex-col overflow-hidden rounded-xl border border-border', className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </PaletteRoot>
    </React.Suspense>
  )
}
