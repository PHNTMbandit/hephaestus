import { ExportIcon } from '@phosphor-icons/react'
import { cn, MenuItem } from 'dawn-ui-react'

type PaletteMenuExportProps = React.ComponentProps<typeof MenuItem>

export const PaletteMenuExport = ({
  className,
  children,
  ref,
  ...props
}: PaletteMenuExportProps) => {
  return (
    <MenuItem className={cn('', className)} ref={ref} {...props}>
      <ExportIcon weight="bold" />
      Export
      {children}
    </MenuItem>
  )
}
