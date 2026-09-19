import { cn } from 'dawn-ui-react'
import React from 'react'

type PaletteGridProps<T extends { id?: string }> = Omit<React.ComponentProps<'div'>, 'children'> & {
  children: (palette: T) => React.ReactNode
  items: T[]
}

export const PaletteGrid = <T extends { id?: string }>({
  className,
  children,
  ref,
  items,
  ...props
}: PaletteGridProps<T>) => {
  return (
    <div
      className={cn(
        'box-border grid size-full min-h-0 max-w-full min-w-0 flex-1 auto-rows-[360px] grid-cols-[repeat(auto-fill,minmax(min(256px,100%),1fr))] gap-md overflow-x-hidden overflow-y-auto p-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {items?.filter((palette) => palette?.id).map((palette) => children(palette))}
    </div>
  )
}
