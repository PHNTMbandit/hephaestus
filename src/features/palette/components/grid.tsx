import { cn } from 'dawn-ui-react'
import React from 'react'

type PaletteGridProps = React.ComponentProps<'div'>

export const PaletteGrid = ({ className, children, ref, ...props }: PaletteGridProps) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div
        className={cn(
          'grid auto-rows-[384px] grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-md p-md',
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
