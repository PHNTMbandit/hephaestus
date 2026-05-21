import { GridFourIcon, NotepadIcon, PaletteIcon } from '@phosphor-icons/react'
import { m } from '@/paraglide/messages'

import type { SecureRoute } from '../types/secure-route'

export const secureRoutes: SecureRoute[] = [
  {
    leadingIcon: GridFourIcon,
    label: m['dashboard.label'](),
    linkOptions: { to: '/dashboard' },
  },
  {
    leadingIcon: PaletteIcon,
    label: m['paletteGenerator.label'](),
    linkOptions: { to: '/palette-generator' },
  },
  {
    leadingIcon: NotepadIcon,
    label: m['projects.label'](),
    linkOptions: { to: '/projects' },
  },
]
