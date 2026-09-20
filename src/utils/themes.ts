import { ComputerTowerIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import {
  'common.themes.light' as common_themes_light,
  'common.themes.dark' as common_themes_dark,
  'common.themes.system' as common_themes_system,
} from '#/paraglide/messages'

import type { Theme } from 'dawn-ui-react'

export const themes: Theme[] = [
  { value: 'light', label: common_themes_light(), icon: SunIcon },
  { value: 'dark', label: common_themes_dark(), icon: MoonIcon },
  { value: 'system', label: common_themes_system(), icon: ComputerTowerIcon },
]
