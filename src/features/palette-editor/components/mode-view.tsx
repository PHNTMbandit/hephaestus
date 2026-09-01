import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteModeViewProps = {
  children: (props: { mode: 'list' | 'preview' }) => React.ReactNode
}

export const PaletteModeView = ({ children }: PaletteModeViewProps) => {
  const { state } = usePalette()

  return children({ mode: state.mode ?? 'list' })
}
