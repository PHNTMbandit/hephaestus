import { cn, Separator, TabsPanel } from 'dawn-ui-react'
import { PaletteAccessibilityPreview } from './palette-accessibility-preview'
import { PaletteAccessibilityRoot } from './palette-accessibility-root'
import { PaletteAccessibilityScores } from './palette-accessibility-scores'
import { PaletteAccessibilitySwatches } from './palette-accessibility-swatches'

type PaletteAccessibilityContentProps = React.ComponentProps<'div'>

export const PaletteAccessibilityContent = ({
  className,
  ref,
  ...props
}: PaletteAccessibilityContentProps) => {
  return (
    <TabsPanel value="accessibility">
      <PaletteAccessibilityRoot>
        <div className={cn('flex w-full flex-col gap-md', className)} ref={ref} {...props}>
          <PaletteAccessibilitySwatches role="foreground" />
          <PaletteAccessibilitySwatches role="background" />
          <Separator />
          <PaletteAccessibilityPreview />
          <PaletteAccessibilityScores />
        </div>
      </PaletteAccessibilityRoot>
    </TabsPanel>
  )
}
