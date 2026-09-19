import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './router-utils'

import type React from 'react'

export const createMockRoute = (
  path: string,
  component: React.ComponentType,
  options: any = {},
) => {
  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
    ...options,
  })
}
