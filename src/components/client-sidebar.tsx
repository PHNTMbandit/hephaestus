import { CheckIcon } from '@phosphor-icons/react'
import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr'
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'dawn-ui-react'
import { secureRoutes } from '#/lib/secure-routes.ts'

import type { User } from 'better-auth'

type ClientSidebarProps = React.ComponentProps<'div'> & {
  user: User
}

export const ClientSidebar = ({ user, className, children, ref, ...props }: ClientSidebarProps) => {
  return (
    <Sidebar tone="ghost" className={cn('', className)} ref={ref} {...props}>
      <SidebarHeader>
        {(isExpanded) => {
          return <span className={cn('style-text-strong-2', !isExpanded && 'hidden')}>Dawn UI</span>
        }}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {secureRoutes.map((route) => (
            <Link key={route.label} {...route.linkOptions} className="w-full">
              {({ isActive }) => (
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive}>
                    <route.leadingIcon weight="bold" /> <span>{route.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </Link>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {(isExpanded) => (
          <Profile>
            <Avatar>
              <AvatarImage src={'https://github.com/shadcn.png'} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
              {user.emailVerified && (
                <AvatarBadge tone="success">
                  <CheckIcon weight="bold" />
                </AvatarBadge>
              )}
            </Avatar>
            {isExpanded && (
              <>
                <ProfileContent>
                  <ProfileName>{user.name}</ProfileName>
                  <ProfileSubname>{user.email}</ProfileSubname>
                </ProfileContent>
                <ProfileAction>
                  <CaretUpDownIcon weight="bold" />
                </ProfileAction>
              </>
            )}
          </Profile>
        )}
      </SidebarFooter>
      {children}
    </Sidebar>
  )
}
