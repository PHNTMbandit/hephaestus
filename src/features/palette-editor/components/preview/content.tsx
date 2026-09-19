import { cn, Label, TabsPanel } from 'dawn-ui-react'
import { PaletteEditor } from '../palette-editor'

type PaletteEditorPreviewContentProps = React.ComponentProps<'div'>

export const PaletteEditorPreviewContent = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorPreviewContentProps) => {
  return (
    <TabsPanel value="preview" className={'w-full'}>
      <div className={cn('flex w-full flex-col gap-md p-md', className)} ref={ref} {...props}>
        {children}
        <div className="flex flex-col gap-xs">
          <Label>Value Type</Label>
          <PaletteEditor.ValueSelect />
        </div>
        <div className="flex flex-col gap-xs">
          <Label>Render Mode</Label>
          <PaletteEditor.PreviewRenderToggle />
        </div>
      </div>
    </TabsPanel>
  )
}
