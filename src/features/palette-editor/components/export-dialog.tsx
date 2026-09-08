import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  Skeleton,
} from 'dawn-ui-react'
import React from 'react'
import { m } from '#/paraglide/messages.js'
import { PaletteEditorExportCss } from './export-css'

type PaletteEditorExportDialogProps = Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
  children?: React.ReactNode
}

export const PaletteEditorExportDialog = ({
  children,
  ...props
}: PaletteEditorExportDialogProps) => {
  return (
    <Dialog {...props}>
      {children}
      <DialogPopup className={'w-1/2'}>
        <React.Suspense fallback={<Skeleton />}>
          <DialogHeader>
            <DialogTitle>{m['colorPalette.export.title']()}</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <PaletteEditorExportCss />
          </DialogContent>
        </React.Suspense>
      </DialogPopup>
    </Dialog>
  )
}
