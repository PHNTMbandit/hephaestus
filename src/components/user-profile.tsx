import { CheckIcon, CaretUpDownIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverPanel,
  PopoverTrigger,
  Profile,
  ProfileAction,
  ProfileContent,
  ProfileName,
  ProfileSubname,
} from 'dawn-ui-react'
import { currentUserQueryOptions } from '#/utils/auth-func'
import { LanguageSelect } from './language-select'
import { SignOut } from './sign-out'
import { ThemeSelect } from './theme-select'

type UserProfileProps = React.ComponentProps<'div'> & {
  compact?: boolean
}

export const UserProfile = ({
  compact = false,
  className,
  children,
  ref,
  ...props
}: UserProfileProps) => {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)

  if (!user) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'ghost'} tone="neutral" size={'large'}>
          <Profile className={cn('', className)} ref={ref} {...props}>
            <Avatar>
              {user?.image ? (
                <AvatarImage src={user?.image} alt={user?.name} />
              ) : (
                <AvatarFallback>
                  {user?.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              )}
              {user?.emailVerified && (
                <AvatarBadge tone="success">
                  <CheckIcon weight="bold" />
                </AvatarBadge>
              )}
            </Avatar>
            {children}
            {!compact && (
              <>
                <ProfileContent>
                  <ProfileName>{user?.name}</ProfileName>
                  <ProfileSubname>{user?.email}</ProfileSubname>
                </ProfileContent>
                <ProfileAction>
                  <CaretUpDownIcon weight="bold" />
                </ProfileAction>
              </>
            )}
          </Profile>
        </Button>
      </PopoverTrigger>
      <PopoverPanel className={'bg-surface'}>
        <PopoverContent>
          <LanguageSelect />
          <ThemeSelect />
          <SignOut />
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
