import { cn, Sidebar, SidebarContent } from 'dawn-ui-react'
import { PaletteEditorLibraryTable } from './library-table'

type LibrarySidebarProps = React.ComponentProps<'div'>

export const PaletteEditorLibrarySidebar = ({
  className,
  children,
  ref,
  ...props
}: LibrarySidebarProps) => {
  return (
    <Sidebar tone="ghost" className={cn('', className)} ref={ref} {...props}>
      <SidebarContent>
        <PaletteEditorLibraryTable />
      </SidebarContent>
      {children}
    </Sidebar>
  )
}
