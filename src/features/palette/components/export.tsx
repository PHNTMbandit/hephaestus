import { ExportIcon } from '@phosphor-icons/react/dist/ssr'
import { Button, cn } from 'dawn-ui-react'

type PaletteExportProps = React.ComponentProps<typeof Button>

export const PaletteExport = ({ className, children, ref, ...props }: PaletteExportProps) => {
  return (
    <Button tone="neutral" variant={'ghost'} className={cn('', className)} ref={ref} {...props}>
      <ExportIcon weight="bold" />
      Export
      {children}
    </Button>
  )
}
