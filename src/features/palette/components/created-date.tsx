import { CalendarIcon } from '@phosphor-icons/react'
import { cn } from 'dawn-ui-react'
import { getLocale } from '#/paraglide/runtime'
import { formatDate } from '#/utils/datetime'
import { usePalette } from '../hooks/use-palette'

type PaletteCreatedDateProps = React.ComponentProps<'span'>

export const PaletteCreatedDate = ({
  className,
  children,
  ref,
  ...props
}: PaletteCreatedDateProps) => {
  const { state } = usePalette()
  const locale = getLocale()
  if (!state.createdAt) return null

  const date = new Date(state.createdAt)
  const formattedDate = formatDate(date, locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <span
      className={cn('flex items-center gap-2xs style-text-default--1 [&>svg]:size-sm', className)}
      ref={ref}
      {...props}
    >
      <CalendarIcon weight="bold" />
      {formattedDate}
      {children}
    </span>
  )
}
