import { cn } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { hydratePaletteState } from '../utils/state'
import { PaletteDescription } from './description'
import { PaletteName } from './name'
import { PaletteRoot } from './root'
import { PaletteSwatches } from './swatches'

import type { PaletteInitialState } from '../types/state'

type PaletteCardProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  palette: PaletteInitialState & { name?: string; description?: string }
  children?: React.ReactNode
}

export const PaletteCard = ({ palette, className, children, ref, ...props }: PaletteCardProps) => {
  return (
    <div className={cn('flex flex-col gap-2xs', className)} ref={ref} {...props}>
      <PaletteRoot initialState={hydratePaletteState(palette)}>
        <PaletteSwatches orientation="horizontal" rounded="xxLarge">
          {({ color }) => (
            <Color.Provider color={color}>
              <Color.Swatch />
            </Color.Provider>
          )}
        </PaletteSwatches>
      </PaletteRoot>
      {palette.name && <PaletteName>{palette.name}</PaletteName>}
      {palette.description && <PaletteDescription>{palette.description}</PaletteDescription>}
      {children}
    </div>
  )
}
