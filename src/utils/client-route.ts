import { CLIENT_ROUTES } from '#/constants/client-routes'

import type { ClientRoute } from '#/types/client-route'

export const getClientRoute = (location: string): ClientRoute | undefined => {
  const route = Object.values(CLIENT_ROUTES).find((route) => {
    const routeTo = route.linkOptions.to
    if (!routeTo) return false

    const routePath = routeTo.replace(/\/\{.*?\}/g, '')
    return location.startsWith(routePath)
  })

  return route
}
