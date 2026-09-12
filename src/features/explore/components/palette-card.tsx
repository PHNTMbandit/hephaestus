import { MenuSeparator } from 'dawn-ui-react'
import React from 'react'
import { Color } from '#/features/color/components/color'
import { PaletteEditor } from '#/features/palette-editor/components/palette-editor'
import { Palette } from '#/features/palette/components/palette'

type ExplorePaletteCardProps = {
  palette: React.ComponentProps<typeof Palette.Card>['palette']
}

export const ExplorePaletteCard = ({ palette }: ExplorePaletteCardProps) => {
  const [exportOpen, setExportOpen] = React.useState(false)

  return (
    <Palette.Card palette={palette}>
      <Palette.Swatches>
        {({ color }) => (
          <Color.Provider color={color}>
            <Color.Swatch />
          </Color.Provider>
        )}
      </Palette.Swatches>
      <Palette.CardFooter>
        <Palette.Open>
          <Palette.Name />
        </Palette.Open>
        <Palette.Saves />
        <Palette.Menu>
          <Palette.MenuEdit />
          <Palette.MenuRemix />
          <MenuSeparator />
          <Palette.MenuExport onClick={() => setExportOpen(true)} />
        </Palette.Menu>
      </Palette.CardFooter>
      <PaletteEditor.ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </Palette.Card>
  )
}
