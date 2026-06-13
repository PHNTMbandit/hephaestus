import chroma from 'chroma-js'
import { cn } from 'dawn-ui-react'
import { useColour } from './colour-provider'

type ColourValueProps = React.ComponentProps<'span'>

export const ColourValue = ({ className, children, ref, ...props }: ColourValueProps) => {
  const { colour } = useColour()

  return (
    <span
      style={{
        color: chroma.contrast(colour.value, 'white') > 4.5 ? 'var(--white)' : 'var(--black)',
      }}
      className={cn(
        'w-full truncate text-left style-text-strong-2 uppercase xl:text-center',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
}
