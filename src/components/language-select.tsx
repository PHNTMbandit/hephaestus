import { CaretUpDownIcon, TranslateIcon } from '@phosphor-icons/react'
import {
  cn,
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from 'dawn-ui-react'
import { getLocale, setLocale } from '@/paraglide/runtime'
import { languages } from '@/utils/languages'

import type * as React from 'react'

type LanguageSelectProps = React.ComponentProps<typeof SelectTrigger> & {
  compact?: boolean
}

export const LanguageSelect = ({ compact, className, ref, ...props }: LanguageSelectProps) => {
  const handleValueChange = (value: unknown) => {
    setLocale(value as 'en' | 'ja')
  }

  return (
    <Select items={languages} onValueChange={handleValueChange} value={getLocale()}>
      <SelectTrigger variant={'ghost'} {...props} className={cn('w-full', className)} ref={ref}>
        <SelectValue>
          {(value: keyof typeof languages) => (
            <>
              <TranslateIcon weight="bold" />
              {!compact && (
                <span>
                  {String(languages.find((language) => language.value === value)?.label ?? value)}
                </span>
              )}
            </>
          )}
        </SelectValue>
        {!compact && (
          <SelectIcon>
            <CaretUpDownIcon weight="bold" />
          </SelectIcon>
        )}
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
