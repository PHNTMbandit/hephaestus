import { WarningIcon } from '@phosphor-icons/react'
import { useBlocker } from '@tanstack/react-router'
import {
  cn,
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogConfirm,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  Separator,
} from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteBlockerProps = React.ComponentProps<typeof AlertDialogPopup>

export const PaletteBlocker = ({ className, children, ref, ...props }: PaletteBlockerProps) => {
  const { state } = usePalette()
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () =>
      state.saving === true ? false : state.redoActions.length > 0 || state.undoActions.length > 0,
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
          <WarningIcon weight="fill" />
          <AlertDialogContent>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <p>You have unsaved changes. Are you sure you want to leave?</p>
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialogHeader>
        {children}
        <AlertDialogActions>
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
        </AlertDialogActions>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
