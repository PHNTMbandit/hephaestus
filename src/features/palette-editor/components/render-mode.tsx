import { usePalette } from '#/features/palette/hooks/use-palette'

import type { PaletteRenderMode } from '#/features/palette/types/state'

type PaletteEditorRenderModeProps = {
  children: (props: { mode: PaletteRenderMode }) => React.ReactNode
}

export const PaletteEditorRenderMode = ({ children }: PaletteEditorRenderModeProps) => {
  const { state } = usePalette()

  return children({ mode: state.mode ?? 'list' })
}
