import { CLIENT_ROUTES } from '#/constants/client-routes'

import type { ClientRoute } from '#/types/client-route'

export const getClientRoute = (location: string): ClientRoute | undefined => {
  const matches = Object.values(CLIENT_ROUTES).filter((route) => {
    const routeTo = route.linkOptions.to
    if (!routeTo) return false

    const routePath = routeTo.replace(/\/\{.*?\}/g, '')
    if (routePath === '/') return location === '/'
    return location === routePath || location.startsWith(`${routePath}/`)
  })

  return matches.sort((a, b) => {
    const aPath = a.linkOptions.to?.replace(/\/\{.*?\}/g, '') ?? ''
    const bPath = b.linkOptions.to?.replace(/\/\{.*?\}/g, '') ?? ''
    return bPath.length - aPath.length
  })[0]
}
