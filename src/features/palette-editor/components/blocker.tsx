import { WarningIcon } from '@phosphor-icons/react'
import { useDbClient } from '@tanstack/react-db'
import { useBlocker, useParams } from '@tanstack/react-router'
import {
  cn,
  AlertDialog,
  AlertDialogIcon,
  AlertDialogClose,
  AlertDialogConfirm,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  Separator,
  AlertDialogFooter,
} from 'dawn-ui-react'
import { paletteCollection } from '#/features/palette/db/palette-collection'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorBlockerProps = React.ComponentProps<typeof AlertDialogPopup>

export const PaletteEditorBlocker = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorBlockerProps) => {
  const { paletteId } = useParams({ from: '/_secure/palette-generator/{-$paletteId}' })
  const collection = useDbClient().collection(paletteCollection)
  const { state } = usePalette()

  const shouldBlock = (): boolean => {
    if (state.saving) {
      return false
    }

    if (paletteId) {
      const palette = collection.get(paletteId)
      const isSameColors =
        palette?.colors.length === state.colors.length &&
        palette?.colors.every((color, index) => color.id === state.colors[index].id)
      return !isSameColors
    }

    if (state.redoActions.length > 0 || state.undoActions.length > 0) {
      return true
    }

    return false
  }

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: shouldBlock,
    withResolver: true,
  })

  return (
    <AlertDialog
      open={status === 'blocked'}
      onOpenChange={(isOpen) => {
        if (!isOpen && status === 'blocked') {
          reset()
        }
      }}
    >
      <AlertDialogPopup tone="warning" className={cn('', className)} ref={ref} {...props}>
        <AlertDialogHeader>
          <AlertDialogIcon>
            <WarningIcon weight="fill" />
          </AlertDialogIcon>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to leave?
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogClose
            onClick={() => {
              if (status === 'blocked') {
                reset()
              }
            }}
          >
            Cancel
          </AlertDialogClose>
          <Separator orientation="vertical" className={'w-px!'} />
          <AlertDialogConfirm
            onClick={() => {
              if (status === 'blocked') {
                proceed()
              }
            }}
          >
            Leave
          </AlertDialogConfirm>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
