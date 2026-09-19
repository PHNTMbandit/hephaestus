import { CheckIcon, PaletteIcon, SidebarSimpleIcon } from '@phosphor-icons/react'
import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr'
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
  SidebarMenuCollapsible,
  SidebarMenuCollapsiblePanel,
  SidebarMenuCollapsibleTrigger,
  SidebarToggle,
} from 'dawn-ui-react'
import { CLIENT_ROUTES } from '#/constants/client-routes'
import { RouteLink } from './route-link'
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
          return (
            <>
              <span className={cn('style-text-strong-3', !isExpanded && 'hidden')}>Dawn UI</span>
              <SidebarToggle>{() => <SidebarSimpleIcon weight="bold" />}</SidebarToggle>
            </>
          )
        }}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <RouteLink route={CLIENT_ROUTES.explore} />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{m['navigation.groups.designTools']()}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuCollapsible>
                <SidebarMenuCollapsibleTrigger>
                  <PaletteIcon weight="bold" />
                  <span>{m['navigation.items.color']()}</span>
                </SidebarMenuCollapsibleTrigger>
                <SidebarMenuCollapsiblePanel>
                  <RouteLink route={CLIENT_ROUTES.contrastChecker} />
                  <RouteLink route={CLIENT_ROUTES.paletteGenerator} />
                </SidebarMenuCollapsiblePanel>
              </SidebarMenuCollapsible>
              <RouteLink route={CLIENT_ROUTES.spacing} />
              <RouteLink route={CLIENT_ROUTES.typography} />
              <RouteLink route={CLIENT_ROUTES.designSystems} />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{m['navigation.groups.myLibrary']()}</SidebarGroupLabel>
            <SidebarGroupContent>
              <RouteLink route={CLIENT_ROUTES.myLibrary} />
              <RouteLink route={CLIENT_ROUTES.favorites} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {(isExpanded) => (
          <Profile>
            <Avatar>
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              )}
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
