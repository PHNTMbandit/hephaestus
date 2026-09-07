import { CaretUpDownIcon } from '@phosphor-icons/react'
import {
  cn,
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
} from 'dawn-ui-react'
import { renderModes } from '#/features/palette-editor/constants/render-modes'
import { usePalette } from '#/features/palette/hooks/use-palette'

import type { PaletteRenderMode } from '#/features/palette/types/state'

type PaletteEditorPreviewRenderToggleProps = React.ComponentProps<typeof SelectTrigger>

export const PaletteEditorPreviewRenderToggle = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPreviewRenderToggleProps) => {
  const { state, dispatch } = usePalette()

  const handleModeChange = (value: unknown) => {
    dispatch({ type: 'SET_RENDER_MODE', payload: { mode: value as PaletteRenderMode } })
  }

  return (
    <Select value={state.mode} onValueChange={handleModeChange}>
      <SelectTrigger variant={'secondary'} className={cn('', className)} ref={ref} {...props}>
        <SelectValue className={'capitalize'}>
          {(value: PaletteRenderMode) => (
            <>
              {renderModes[value].icon}
              <span>{renderModes[value].label}</span>
            </>
          )}
        </SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {Object.entries(renderModes).map(([mode, { label, icon }]) => (
            <SelectItem key={mode} value={mode}>
              <SelectTitle>
                {icon}
                {label}
              </SelectTitle>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
      {children}
    </Select>
  )
}
