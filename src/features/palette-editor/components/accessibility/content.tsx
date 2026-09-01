import { cn, Separator, TabsPanel } from 'dawn-ui-react'
import { PaletteAccessibilityPreview } from './preview'
import { PaletteAccessibilityRecommendation } from './recommendation'
import { PaletteAccessibilityRoot } from './root'
import { PaletteAccessibilityScores } from './scores'
import { PaletteAccessibilitySwatches } from './swatches'

type PaletteAccessibilityContentProps = React.ComponentProps<'div'>

export const PaletteAccessibilityContent = ({
  className,
  ref,
  ...props
}: PaletteAccessibilityContentProps) => {
  return (
    <TabsPanel value="accessibility" className="flex min-h-0 w-full flex-1 flex-col">
      <PaletteAccessibilityRoot>
        <div
          className={cn('flex min-h-0 w-full flex-1 flex-col gap-md', className)}
          ref={ref}
          {...props}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-md overflow-y-auto px-md pt-md">
            <PaletteAccessibilityPreview />
            <div className="flex flex-col gap-xs">
              <PaletteAccessibilitySwatches role="foreground" />
              <PaletteAccessibilitySwatches role="background" />
            </div>
            <PaletteAccessibilityRecommendation />
          </div>
          <div className="px-md">
            <Separator />
          </div>
          <div className="flex max-h-[45%] shrink-0 flex-col overflow-y-auto px-md pb-md">
            <PaletteAccessibilityScores />
          </div>
        </div>
      </PaletteAccessibilityRoot>
    </TabsPanel>
  )
}
