import { cn } from 'dawn-ui-react'
import { useColour } from './colour-provider'

type ColourBlockProps = React.ComponentProps<'div'>

export const ColourBlock = ({ className, children, ref, ...props }: ColourBlockProps) => {
  const { colour } = useColour()

  return (
    <div
      style={{
        backgroundColor: colour.value,
      }}
      className={cn(
        'relative grid size-full grid-cols-2 items-center justify-center gap-md px-xl py-md xl:flex xl:flex-col xl:justify-end xl:px-sm xl:py-lg',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
