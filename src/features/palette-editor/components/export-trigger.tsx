import { ExportIcon } from '@phosphor-icons/react'
import { Button, cn, DialogTrigger } from 'dawn-ui-react'
import React from 'react'

type PaletteEditorExportTriggerProps = React.ComponentProps<'button'>

export const PaletteEditorExportTrigger = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorExportTriggerProps) => {
  return (
    <DialogTrigger>
      <Button tone="neutral" variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
        {children}
        <ExportIcon weight="bold" className="shrink-0" />
        Export
      </Button>
    </DialogTrigger>
  )
}
