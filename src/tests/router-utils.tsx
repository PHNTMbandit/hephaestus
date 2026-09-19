import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
  type AnyRoute,
  type AnyRouter,
} from '@tanstack/react-router'
import { createMemoryHistory } from '@tanstack/react-router'
import { render, type RenderOptions } from '@testing-library/react'

import type React from 'react'

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

export const createTestRouter = (routes: AnyRoute[], initialLocation = '/') => {
  const routeTree = rootRoute.addChildren(routes)

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
  })

  return router
}

interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
  router?: AnyRouter
  initialLocation?: string
  routes?: AnyRoute[]
}

export function renderWithRouter(
  ui: React.ReactElement,
  { router, initialLocation = '/', routes = [], ...renderOptions }: RenderWithRouterOptions = {},
) {
  const activeRouter =
    router ??
    createRouter({
      routeTree: rootRoute.addChildren([
        createRoute({
          getParentRoute: () => rootRoute,
          path: '/',
          component: () => ui,
        }),
        ...routes,
      ]),
      history: createMemoryHistory({ initialEntries: [initialLocation] }),
    })

  return {
    ...render(<RouterProvider router={activeRouter} />, renderOptions),
    router: activeRouter,
  }
}
