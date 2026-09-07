import { GradientIcon, RowsIcon, SquaresFourIcon } from '@phosphor-icons/react'
import { ListIcon } from '@phosphor-icons/react/dist/ssr'

import type { PaletteRenderMode } from '#/features/palette/types/state'

export const renderModes: Record<PaletteRenderMode, { label: string; icon: React.ReactNode }> = {
  list: { label: 'List', icon: <ListIcon weight="bold" /> },
  gradient: { label: 'Gradient', icon: <GradientIcon weight="bold" /> },
  swatches: { label: 'Swatches', icon: <SquaresFourIcon weight="bold" /> },
  blocks: { label: 'Blocks', icon: <RowsIcon weight="bold" /> },
}
