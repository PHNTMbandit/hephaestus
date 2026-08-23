import { ColorPairPreview } from '#/features/color/components/color-pair-preview'
import { usePaletteAccessibility } from '../hooks/use-palette-accessibility'

type PaletteAccessibilityPreviewProps = Omit<
  React.ComponentProps<typeof ColorPairPreview>,
  'foreground' | 'background'
>

export const PaletteAccessibilityPreview = (props: PaletteAccessibilityPreviewProps) => {
  const { foreground, background } = usePaletteAccessibility()

  if (!foreground || !background) {
    return null
  }

  return <ColorPairPreview foreground={foreground.value} background={background.value} {...props} />
}
