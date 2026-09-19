import { Virtualizer } from '@tanstack/react-virtual'
import {
  cn,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPopup,
  ComboboxVirtualizedList,
} from 'dawn-ui-react'
import React from 'react'
import { useTypography } from './provider'

import type { WebFont } from '../types/font-family'

type TypographyFontFamilyProps = React.ComponentProps<typeof ComboboxInput> & {
  fonts: WebFont[]
}

export const TypographyFontFamily = ({
  fonts,
  className,
  children,
  ref,
  ...props
}: TypographyFontFamilyProps) => {
  const { state, dispatch } = useTypography()
  const [open, setOpen] = React.useState(false)
  const virtualizerRef = React.useRef<Virtualizer<HTMLDivElement, HTMLDivElement> | null>(null)

  const handleChange = (value: unknown) => {
    if (!value || typeof value !== 'object' || !('family' in value)) {
      return
    }

    dispatch({
      type: 'SET_FONT_STYLE',
      payload: { fontStyle: value as WebFont },
    })
  }

  return (
    <Combobox
      virtualized
      items={fonts}
      open={open}
      value={state.fontStyle}
      onValueChange={handleChange}
      onOpenChange={setOpen}
      itemToStringLabel={(item) => (item as WebFont).family || ''}
      onItemHighlighted={(item, { reason, index }) => {
        const virtualizer = virtualizerRef.current

        if (!item || !virtualizer) {
          return
        }

        const isStart = index === 0
        const isEnd = index === virtualizer.options.count - 1
        const shouldScroll = reason === 'none' || (reason === 'keyboard' && (isStart || isEnd))

        if (shouldScroll) {
          queueMicrotask(() => {
            virtualizer.scrollToIndex(index, { align: isEnd ? 'start' : 'end' })
          })
        }
      }}
    >
      {children}
      <ComboboxInput className={cn('', className)} ref={ref} {...props} />
      <ComboboxPopup sideOffset={8}>
        <ComboboxEmpty>No options found</ComboboxEmpty>
        <ComboboxVirtualizedList estimateSize={1500} open={open} virtualizerRef={virtualizerRef}>
          {(font: WebFont) => <>{font.family}</>}
        </ComboboxVirtualizedList>
      </ComboboxPopup>
    </Combobox>
  )
}
