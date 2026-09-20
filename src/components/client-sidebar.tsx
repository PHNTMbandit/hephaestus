import { PaletteIcon, SidebarSimpleIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  cn,
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
import { currentUserQueryOptions } from '#/utils/auth-func'
import { RouteLink } from './route-link'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'
import { UserProfile } from './user-profile'
import { m } from '@/paraglide/messages'

type ClientSidebarProps = React.ComponentProps<'div'>

export const ClientSidebar = ({ className, children, ref, ...props }: ClientSidebarProps) => {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)

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
          {user && (
            <SidebarGroup>
              <SidebarGroupLabel>{m['navigation.groups.myLibrary']()}</SidebarGroupLabel>
              <SidebarGroupContent>
                <RouteLink route={CLIENT_ROUTES.myLibrary} />
                <RouteLink route={CLIENT_ROUTES.favorites} />
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {(isExpanded) => (
          <div className="flex w-full flex-col gap-3xs">
            <SignIn />
            <SignUp />
            <UserProfile compact={!isExpanded} />
          </div>
        )}
      </SidebarFooter>
      {children}
    </Sidebar>
  )
}
