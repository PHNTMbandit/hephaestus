import { DbClient } from '@tanstack/db'
import { QueryClient } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { routerWithDbClient } from '@tanstack/react-router-with-db'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PaletteRoot } from '#/features/palette/components/root'
import { PaletteEditorBlocker } from '../components/blocker'

import type { Color } from '#/features/color/color.types.ts'
import type { PaletteInitialState } from '#/features/palette/types/state'
import type { AnyRouter } from '@tanstack/react-router'
import type React from 'react'

// The test route tree is synthetic, so opt out of the globally-registered route types.
const NavLink = Link as unknown as (props: {
  to: string
  children: React.ReactNode
}) => React.ReactElement

const { seededPalettes } = vi.hoisted(() => ({ seededPalettes: [] as unknown[] }))

vi.mock('#/features/palette/utils/palette-queries', () => ({
  getPalettes: vi.fn<() => Promise<unknown[]>>(async () => seededPalettes),
  getPalette: vi.fn<() => void>(),
  publishPalette: vi.fn<() => void>(),
  updatePalette: vi.fn<() => void>(),
  deletePalette: vi.fn<() => void>(),
}))

const colors = (...ids: string[]): Color[] =>
  ids.map((id) => ({ id, value: `#${id}`, locked: false }))

type SavedPalette = {
  id: string
  userId: string
  name: string
  description: string
  visibility: 'private'
  baseColor: string
  colors: Color[]
  createdAt: string
  updatedAt: string
}

const makeSavedPalette = (id: string, paletteColors: Color[]): SavedPalette => ({
  id,
  userId: 'user-1',
  name: 'Saved palette',
  description: '',
  visibility: 'private',
  baseColor: '#ff0000',
  colors: paletteColors,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
})

async function renderBlocker({
  initialState,
  initialLocation = '/palette-generator',
  seed = [] as SavedPalette[],
}: {
  initialState: PaletteInitialState
  initialLocation?: string
  seed?: SavedPalette[]
}) {
  seededPalettes.length = 0
  seededPalettes.push(...seed)

  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const secureRoute = createRoute({ getParentRoute: () => rootRoute, id: '_secure' })
  const paletteRoute = createRoute({
    getParentRoute: () => secureRoute,
    path: 'palette-generator/{-$paletteId}',
    component: () => (
      <PaletteRoot initialState={initialState}>
        <PaletteEditorBlocker />
        <NavLink to="/target">Leave page</NavLink>
      </PaletteRoot>
    ),
  })
  const targetRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'target',
    component: () => <div>Target Page</div>,
  })

  const routeTree = rootRoute.addChildren([secureRoute.addChildren([paletteRoute]), targetRoute])

  const queryClient = new QueryClient()
  const dbClient = new DbClient({ queryClient })

  const router = routerWithDbClient(
    createRouter({
      routeTree,
      context: { queryClient, dbClient },
      history: createMemoryHistory({ initialEntries: [initialLocation] }),
    }) as any,
    dbClient,
  ) as AnyRouter

  const result = render(<RouterProvider router={router} />)
  await router.load()

  return { ...result, router }
}

const dialogText = /unsaved changes/i

afterEach(() => {
  vi.clearAllMocks()
})

describe('Palette Generator Blocker Navigation', () => {
  it('blocks navigation on a new palette that has undo history', async () => {
    await renderBlocker({
      initialState: {
        colors: colors('red', 'green'),
        undoActions: [
          {
            label: 'Add Color',
            before: { colors: [], baseColor: '#ff0000' },
            after: { colors: colors('red'), baseColor: '#ff0000' },
          },
        ],
      },
    })

    fireEvent.click(screen.getByRole('link', { name: /leave page/i }))

    expect(await screen.findByText(dialogText)).toBeInTheDocument()
    expect(screen.queryByText('Target Page')).not.toBeInTheDocument()
  })

  it('does not block navigation on a new palette with no history', async () => {
    await renderBlocker({
      initialState: { colors: colors('red'), undoActions: [], redoActions: [] },
    })

    fireEvent.click(screen.getByRole('link', { name: /leave page/i }))

    expect(await screen.findByText('Target Page')).toBeInTheDocument()
    expect(screen.queryByText(dialogText)).not.toBeInTheDocument()
  })

  it('blocks navigation when a saved palette has unsaved color changes', async () => {
    await renderBlocker({
      initialLocation: '/palette-generator/palette-1',
      seed: [makeSavedPalette('palette-1', colors('red', 'green'))],
      initialState: { colors: colors('red', 'blue') },
    })

    fireEvent.click(screen.getByRole('link', { name: /leave page/i }))

    expect(await screen.findByText(dialogText)).toBeInTheDocument()
  })

  it('does not block navigation when a saved palette is unchanged', async () => {
    await renderBlocker({
      initialLocation: '/palette-generator/palette-1',
      seed: [makeSavedPalette('palette-1', colors('red', 'green'))],
      initialState: { colors: colors('red', 'green') },
    })

    fireEvent.click(screen.getByRole('link', { name: /leave page/i }))

    expect(await screen.findByText('Target Page')).toBeInTheDocument()
  })
})
