import { cn } from 'dawn-ui-react'
import React from 'react'

type PaletteGridProps = React.ComponentProps<'div'>

export const PaletteGrid = ({ className, children, ref, ...props }: PaletteGridProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div
        className={cn(
          'box-border grid size-full min-h-0 max-w-full min-w-0 auto-rows-min grid-cols-[repeat(auto-fill,minmax(min(312px,100%),1fr))] gap-md overflow-x-hidden overflow-y-auto p-md',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </React.Suspense>
  )
}
