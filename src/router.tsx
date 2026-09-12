import { createRouter as createTanStackRouter, ErrorComponent } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routerWithDbClient } from '@tanstack/react-router-with-db'
import { getContext } from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <p>Loading...</p>,
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return routerWithDbClient(router, context.dbClient)
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
