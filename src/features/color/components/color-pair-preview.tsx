import { cn } from 'dawn-ui-react'

type ColorPairPreviewProps = React.ComponentProps<'div'> & {
  foreground: string
  background: string
}

// Renders sample content with a foreground colour on a background colour.
export const ColorPairPreview = ({
  foreground,
  background,
  className,
  children,
  ref,
  ...props
}: ColorPairPreviewProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-center rounded-lg border border-border px-md py-sm',
        className,
      )}
      style={{ backgroundColor: background, color: foreground }}
      ref={ref}
      {...props}
    >
      {children ?? (
        <>
          <span className="style-text-strong-2">Preview</span>
          <span className="style-text-prose-0">The quick brown fox jumps over the lazy dog</span>
        </>
      )}
    </div>
  )
}
