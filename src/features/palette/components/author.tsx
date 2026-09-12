import { UserIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { cn } from 'dawn-ui-react'
import { userQueryOptions } from '#/features/auth/utils/queries'
import { usePalette } from '../hooks/use-palette'

type PaletteAuthorProps = React.ComponentProps<'div'>

export const PaletteAuthor = ({ className, children, ref, ...props }: PaletteAuthorProps) => {
  const { state } = usePalette()
  const { data } = useSuspenseQuery(userQueryOptions(state.userId))

  return (
    <div
      className={cn('flex items-center gap-2xs style-text-default--1 [&>svg]:size-sm', className)}
      ref={ref}
      {...props}
    >
      <UserIcon weight="bold" />
      {data.username}
      {children}
    </div>
  )
}
