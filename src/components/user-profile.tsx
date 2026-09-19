import { CheckIcon, CaretUpDownIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  cn,
  Profile,
  ProfileAction,
  ProfileContent,
  ProfileName,
  ProfileSubname,
} from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'

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
  const { data } = authClient.useSession()
  const user = data?.user

  if (!user) {
    return <Link to="/sign-in">Sign in</Link>
  }

  return (
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
  )
}
