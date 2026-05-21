import chroma from 'chroma-js'
import { cn } from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette.ts'
import { useColour } from './colour-provider'

type ColourValueProps = React.ComponentProps<'span'>

export const ColourValue = ({ className, children, ref, ...props }: ColourValueProps) => {
  const { colour } = useColour()
  const { state } = usePalette()

  return (
    <span
      style={{
        color: chroma.contrast(colour.hex, 'white') > 4.5 ? 'var(--white)' : 'var(--black)',
      }}
      className={cn(
        'w-full truncate text-left style-text-strong-2 uppercase xl:text-center',
        className,
      )}
      ref={ref}
      {...props}
    >
      {state.valueType.render(colour.hex)}
      {children}
    </span>
  )
}
