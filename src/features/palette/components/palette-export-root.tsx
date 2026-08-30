import { ExportIcon } from '@phosphor-icons/react'
import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from 'dawn-ui-react'
import React from 'react'
import { m } from '#/paraglide/messages.js'
import { PaletteExportCss } from './palette-export-css'

type PaletteExportRootProps = React.ComponentProps<'button'>

export const PaletteExportRoot = ({
  className,
  children,
  ref,
  ...props
}: PaletteExportRootProps) => {
  return (
    <React.Suspense
      fallback={
        <Button
          tone="neutral"
          variant={'ghost'}
          disabled
          className={cn('', className)}
          ref={ref}
          {...props}
        >
          {children}
          <CircleNotchIcon weight="bold" className="shrink-0 animate-spin" />
        </Button>
      }
    >
      <Dialog>
        <DialogTrigger>
          <Button
            tone="neutral"
            variant={'ghost'}
            className={cn('', className)}
            ref={ref}
            {...props}
          >
            {children}
            <ExportIcon weight="bold" className="shrink-0" />
            Export
          </Button>
        </DialogTrigger>
        <DialogPopup className={'w-1/2'}>
          <DialogHeader>
            <DialogTitle>{m['colorPalette.export.title']()}</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <PaletteExportCss />
          </DialogContent>
        </DialogPopup>
      </Dialog>
    </React.Suspense>
  )
}
