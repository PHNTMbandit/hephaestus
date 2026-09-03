import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorModeViewProps = {
  children: (props: { mode: 'list' | 'preview' }) => React.ReactNode
}

export const PaletteEditorModeView = ({ children }: PaletteEditorModeViewProps) => {
  const { state } = usePalette()

  return children({ mode: state.mode ?? 'list' })
}
