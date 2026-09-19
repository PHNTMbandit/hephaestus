import { ColorPairPreview } from '#/features/color/components/pair-preview'
import { usePaletteAccessibility } from '#/features/palette-editor/hooks/use-palette-accessibility'

type PaletteEditorAccessibilityPreviewProps = Omit<
  React.ComponentProps<typeof ColorPairPreview>,
  'foreground' | 'background'
>

export const PaletteEditorAccessibilityPreview = (
  props: PaletteEditorAccessibilityPreviewProps,
) => {
  const { foreground, background } = usePaletteAccessibility()

  if (!foreground || !background) {
    return null
  }

  return <ColorPairPreview foreground={foreground.value} background={background.value} {...props} />
}
