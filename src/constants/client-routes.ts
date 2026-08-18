import {
  MagnifyingGlassIcon,
  CircleHalfIcon,
  SwatchesIcon,
  RulerIcon,
  TextAaIcon,
  NotePencilIcon,
  BooksIcon,
} from '@phosphor-icons/react'
import { m } from '#/paraglide/messages'

import type { ClientRoute } from '#/types/client-route'

export type ClientRouteName =
  | 'explore'
  | 'contrastChecker'
  | 'paletteGenerator'
  | 'spacing'
  | 'typography'
  | 'designSystems'
  | 'myLibrary'
  | 'favorites'

export const CLIENT_ROUTES: Record<ClientRouteName, ClientRoute> = {
  explore: {
    label: m['navigation.items.explore'](),
    leadingIcon: MagnifyingGlassIcon,
    linkOptions: {
      to: '/explore',
    },
  },
  contrastChecker: {
    label: m['navigation.items.contrastChecker'](),
    leadingIcon: CircleHalfIcon,
    linkOptions: {
      to: '/contrast-checker',
    },
  },
  paletteGenerator: {
    label: m['navigation.items.paletteGenerator'](),
    leadingIcon: SwatchesIcon,
    linkOptions: {
      to: '/palette-generator/{-$projectId}',
    },
  },
  spacing: {
    label: m['navigation.items.spacing'](),
    leadingIcon: RulerIcon,
    linkOptions: {
      to: '/spacing',
    },
  },
  typography: {
    label: m['navigation.items.typography'](),
    leadingIcon: TextAaIcon,
    linkOptions: {
      to: '/typography',
    },
  },
  designSystems: {
    label: m['navigation.items.designSystems'](),
    leadingIcon: NotePencilIcon,
    linkOptions: {
      to: '/design-systems',
    },
  },
  myLibrary: {
    label: m['navigation.groups.myLibrary'](),
    leadingIcon: BooksIcon,
    linkOptions: {
      to: '/my-library',
    },
  },
  favorites: {
    label: m['navigation.items.favorites'](),
    leadingIcon: BooksIcon,
    linkOptions: {
      to: '/favorites',
    },
  },
}
