import { UserIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
  Profile,
  ProfileContent,
  ProfileName,
  ProfileSubname,
} from 'dawn-ui-react'
import { userQueryOptions } from '#/features/auth/utils/queries'
import { usePalette } from '../hooks/use-palette'

type PaletteAuthorProps = React.ComponentProps<'div'>

export const PaletteAuthor = ({ className, children, ref, ...props }: PaletteAuthorProps) => {
  const { state } = usePalette()
  const { data } = useSuspenseQuery(userQueryOptions(state.userId))

  return (
    <PreviewCard>
      <PreviewCardTrigger>
        <div
          className={cn(
            'flex items-center gap-2xs style-text-default--1 whitespace-nowrap hover:cursor-pointer hover:underline [&>svg]:size-sm',
            className,
          )}
          ref={ref}
          {...props}
        >
          <UserIcon weight="bold" className="shrink-0" />
          {data.username}
          {children}
        </div>
      </PreviewCardTrigger>
      <PreviewCardPopup>
        <div className="p-2xs pr-lg">
          <Profile>
            <Avatar>
              {data.image ? (
                <AvatarImage src={data.image} alt={data.name} />
              ) : (
                <AvatarFallback>
                  {data.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <ProfileContent>
              <ProfileName>{data.name}</ProfileName>
              <ProfileSubname>{data.username}</ProfileSubname>
            </ProfileContent>
          </Profile>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
