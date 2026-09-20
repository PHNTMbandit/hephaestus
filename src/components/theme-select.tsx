import { CaretUpDownIcon } from '@phosphor-icons/react'
import {
  cn,
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  getThemeByValue,
  type ThemeValue,
  SelectTitle,
} from 'dawn-ui-react'
import { useTheme } from '#/hooks/use-theme'
import { themes } from '@/utils/themes'

import type * as React from 'react'

type ThemeSelectProps = React.ComponentProps<typeof SelectTrigger> & {
  compact?: boolean
}

export const ThemeSelect = ({ compact, className, ref, ...props }: ThemeSelectProps) => {
  const { theme, setTheme } = useTheme()

  const handleChange = (value: unknown) => {
    setTheme(value as ThemeValue)
  }

  return (
    <Select items={themes} value={theme} onValueChange={handleChange}>
      <SelectTrigger variant={'ghost'} className={cn('w-full', className)} ref={ref} {...props}>
        <SelectValue>
          {(value: ThemeValue) => {
            const selectedTheme = getThemeByValue(value, themes)
            if (!selectedTheme) return null
            const Icon = selectedTheme.icon
            return (
              <>
                <Icon weight="bold" />
                {!compact && <span>{selectedTheme.label}</span>}
              </>
            )
          }}
        </SelectValue>
        {!compact && (
          <SelectIcon>
            <CaretUpDownIcon weight="bold" />
          </SelectIcon>
        )}
      </SelectTrigger>
      <SelectPopup className={'z-99'}>
        <SelectList>
          {themes.map((themeOption) => (
            <SelectItem key={themeOption.value} value={themeOption.value}>
              <SelectTitle>
                <themeOption.icon weight="bold" />
                {themeOption.label}
              </SelectTitle>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
