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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'dawn-ui-react'
import { exploreRoute, myRoutes, secureRoutes } from '#/lib/my-routes.ts'
import { m } from '@/paraglide/messages'

import type { User } from 'better-auth'

type ClientSidebarProps = React.ComponentProps<'div'> & {
  user: User
}

export const ClientSidebar = ({ user, className, children, ref, ...props }: ClientSidebarProps) => {
  return (
    <Sidebar width={350} tone="ghost" className={cn('', className)} ref={ref} {...props}>
      <SidebarHeader>
        {(isExpanded) => {
          return <span className={cn('style-text-strong-2', !isExpanded && 'hidden')}>Dawn UI</span>
        }}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            {exploreRoute.map((route) => (
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
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{m['navigation.groups.designTools']()}</SidebarGroupLabel>
            <SidebarGroupContent>
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
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{m['navigation.groups.myLibrary']()}</SidebarGroupLabel>
            <SidebarGroupContent>
              {myRoutes.map((route) => (
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
            </SidebarGroupContent>
          </SidebarGroup>
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
