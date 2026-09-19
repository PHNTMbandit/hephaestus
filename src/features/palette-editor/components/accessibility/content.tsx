import { cn, Separator, TabsPanel } from 'dawn-ui-react'
import { PaletteEditorAccessibilityPreview } from './preview'
import { PaletteEditorAccessibilityRecommendation } from './recommendation'
import { PaletteEditorAccessibilityRoot } from './root'
import { PaletteEditorAccessibilityScores } from './scores'
import { PaletteEditorAccessibilitySwatches } from './swatches'

type PaletteEditorAccessibilityContentProps = React.ComponentProps<'div'>

export const PaletteEditorAccessibilityContent = ({
  className,
  ref,
  ...props
}: PaletteEditorAccessibilityContentProps) => {
  return (
    <TabsPanel value="accessibility" className="flex min-h-0 w-full flex-1 flex-col">
      <PaletteEditorAccessibilityRoot>
        <div
          className={cn('flex min-h-0 w-full flex-1 flex-col gap-md', className)}
          ref={ref}
          {...props}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-md overflow-y-auto px-md pt-md">
            <PaletteEditorAccessibilityPreview />
            <div className="flex flex-col gap-xs">
              <PaletteEditorAccessibilitySwatches role="foreground" />
              <PaletteEditorAccessibilitySwatches role="background" />
            </div>
            <PaletteEditorAccessibilityRecommendation />
          </div>
          <div className="px-md">
            <Separator />
          </div>
          <div className="flex max-h-[45%] shrink-0 flex-col overflow-y-auto px-md pb-md">
            <PaletteEditorAccessibilityScores />
          </div>
        </div>
      </PaletteEditorAccessibilityRoot>
    </TabsPanel>
  )
}
