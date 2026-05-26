import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import chroma from 'chroma-js'
import { cn } from 'dawn-ui-react'
import { colourNameQueryOptions } from '../colour.utils'
import { useColour } from './colour-provider'

type ColourNameProps = React.ComponentProps<'span'>

export const ColourName = ({ className, children, ref, ...props }: ColourNameProps) => {
  const { colour } = useColour()
  const { data, isPending } = useQuery(colourNameQueryOptions(colour.value))

  return (
    <span
      style={{
        color: chroma.contrast(colour.value, 'white') > 4.5 ? 'var(--white)' : 'var(--black)',
        opacity: 0.65,
      }}
      className={cn('w-full truncate text-left style-text-default-0 xl:text-center', className)}
      ref={ref}
      {...props}
    >
      {children}
      {isPending ? <CircleNotchIcon weight="bold" className="animate-spin xl:mx-auto" /> : data}
    </span>
  )
}
