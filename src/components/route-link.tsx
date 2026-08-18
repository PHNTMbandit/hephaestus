import { Link } from '@tanstack/react-router'
import { cn, SidebarMenuButton, SidebarMenuItem } from 'dawn-ui-react'

import type { ClientRoute } from '#/types/client-route'

type RouteLinkProps = {
  route: ClientRoute
  className?: string
}

export const RouteLink = ({ route, className }: RouteLinkProps) => {
  const LeadingIcon = route.leadingIcon

  return (
    <Link {...route.linkOptions} className={cn('w-full', className)}>
      {({ isActive }) => (
        <SidebarMenuItem>
          <SidebarMenuButton isActive={isActive}>
            <LeadingIcon weight="bold" />
            <span>{route.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </Link>
  )
}
