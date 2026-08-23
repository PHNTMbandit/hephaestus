import { cn } from 'dawn-ui-react'
import { usePaletteAccessibility } from '../hooks/use-palette-accessibility'

type PaletteAccessibilityPreviewProps = React.ComponentProps<'div'>

export const PaletteAccessibilityPreview = ({
  className,
  children,
  ref,
  ...props
}: PaletteAccessibilityPreviewProps) => {
  const { foreground, background } = usePaletteAccessibility()

  if (!foreground || !background) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center gap-2xs rounded-lg border border-border px-md py-sm',
        className,
      )}
      style={{ backgroundColor: background.value, color: foreground.value }}
      ref={ref}
      {...props}
    >
      {children}
      <span className="style-text-strong-3">Aa</span>
      <span>The quick brown fox jumps over the lazy dog</span>
    </div>
  )
}
