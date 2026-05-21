import { cn } from 'dawn-ui-react'
import { useColour } from './colour-provider'

type ColourBlockProps = React.ComponentProps<'div'>

export const ColourBlock = ({ className, children, ref, ...props }: ColourBlockProps) => {
  const { colour } = useColour()

  return (
    <div
      style={{
        backgroundColor: colour.hex,
      }}
      className={cn(
        'group relative grid size-full grid-cols-3 items-center justify-center gap-md px-sm xl:flex xl:flex-col xl:justify-end xl:py-lg',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
