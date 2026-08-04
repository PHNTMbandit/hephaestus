import { PaletteIcon } from '@phosphor-icons/react'
import {
  BooksIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  NotePencilIcon,
  RulerIcon,
  TextAaIcon,
} from '@phosphor-icons/react/dist/ssr'
import { m } from '@/paraglide/messages'

import type { SecureRoute } from '../types/secure-route'

export const exploreRoute: SecureRoute[] = [
  {
    leadingIcon: MagnifyingGlassIcon,
    label: m['navigation.items.explore'](),
    linkOptions: { to: '/explore' },
  },
]

export const secureRoutes: SecureRoute[] = [
  {
    leadingIcon: PaletteIcon,
    label: m['navigation.items.colorPalette'](),
    linkOptions: { to: '/color-palette' },
  },
  {
    leadingIcon: RulerIcon,
    label: m['navigation.items.spacing'](),
    linkOptions: { to: '/spacing' },
  },
  {
    leadingIcon: TextAaIcon,
    label: m['navigation.items.typography'](),
    linkOptions: { to: '/typography' },
  },
  {
    leadingIcon: NotePencilIcon,
    label: m['navigation.items.designSystems'](),
    linkOptions: { to: '/design-systems' },
  },
]

export const myRoutes: SecureRoute[] = [
  {
    leadingIcon: BooksIcon,
    label: m['navigation.items.myLibrary'](),
    linkOptions: { to: '/my-library' },
  },
  {
    leadingIcon: HeartIcon,
    label: m['navigation.items.favourites'](),
    linkOptions: { to: '/favourites' },
  },
]
