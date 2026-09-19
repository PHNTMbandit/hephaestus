import { PaletteIcon, SidebarSimpleIcon } from '@phosphor-icons/react'
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
import { authClient } from '#/lib/auth-client'
import { RouteLink } from './route-link'
import { SignOut } from './sign-out'
import { UserProfile } from './user-profile'
import { m } from '@/paraglide/messages'

type ClientSidebarProps = React.ComponentProps<'div'>

export const ClientSidebar = ({ className, children, ref, ...props }: ClientSidebarProps) => {
  const { data } = authClient.useSession()
  const user = data?.user

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
          <div className="w-full space-y-xs">
            <SignOut />
            <UserProfile compact={!isExpanded} />
          </div>
        )}
      </SidebarFooter>
      {children}
    </Sidebar>
  )
}
