import { createFileRoute, notFound } from '@tanstack/react-router'
import { Separator } from 'dawn-ui-react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { Color } from '#/features/color/components/color.ts'
import { PalettePanelTabs } from '#/features/palette/components/palette-panel-tabs'
import { Palette } from '#/features/palette/components/palette.ts'
import { PALETTE_CONFIG } from '#/features/palette/constants/state.ts'
import {
  generateRandomColor,
  hydratePaletteState,
  serializePaletteState,
} from '#/features/palette/utils/index.ts'

export const Route = createFileRoute('/_secure/palette-generator/{-$projectId}')({
  component: RouteComponent,
  errorComponent: () => <p>Palette doesn't exist</p>,
  loader: async ({ context: { paletteCollection }, params: { projectId } }) => {
    const baseColor = generateRandomColor().value
    const newPaletteState = hydratePaletteState({ baseColor, colors: [] })
    const serializableState = serializePaletteState({
      ...newPaletteState,
      colors: newPaletteState.currentGeneratorMethod.generatePalette(
        baseColor,
        PALETTE_CONFIG.INITIAL_COLORS_COUNT,
      ),
    })

    if (!projectId) {
      return { serializableState, savedPalette: null }
    }

    await paletteCollection.preload()
    const savedPalette = paletteCollection.get(projectId)

    if (projectId && !savedPalette) {
      notFound({ throw: true })
    }

    return { serializableState, savedPalette }
  },
})

function RouteComponent() {
  const { serializableState, savedPalette } = Route.useLoaderData()
  const paletteState = hydratePaletteState(savedPalette ?? serializableState)

  return (
    <Palette.Root key={savedPalette?.id ?? 'new'} initialState={paletteState}>
      <div className="relative flex size-full">
        <Palette.Panel>
          <Palette.PanelHeader>
            <CurrentPageTitle />
            <PalettePanelTabs />
          </Palette.PanelHeader>
          <Palette.PanelContent>
            <Palette.GeneratorContent />
            <Palette.AccessibilityContent />
          </Palette.PanelContent>
        </Palette.Panel>
        <div className="flex w-full flex-col">
          <Palette.Toolbar>
            <Palette.ToolbarGroup>
              {savedPalette && <Palette.Name>{savedPalette.name}</Palette.Name>}
            </Palette.ToolbarGroup>
            <Palette.ToolbarGroup>
              <Palette.ValueSelect />
              <Palette.Undo />
              <Palette.Redo />
              <Separator orientation="vertical" className={'w-px!'} />
              <Palette.Reset />
              <Palette.Export />
              {savedPalette ? <Palette.Update paletteId={savedPalette.id} /> : <Palette.Save />}
            </Palette.ToolbarGroup>
          </Palette.Toolbar>
          <Palette.ModeView>
            {({ mode }) => {
              if (mode === 'list') {
                return (
                  <Palette.ReorderableList>
                    {({ color, isDragging, valueType }) => (
                      <Color.Provider color={color}>
                        <Color.Swatch>
                          <Palette.Add />
                          <Color.Header>
                            <Color.Name />
                          </Color.Header>
                          {!isDragging && (
                            <Color.Actions>
                              <Palette.Delete />
                              <Color.Copy value={valueType?.getColorClipboardFormat(color.value)} />
                              <Palette.Lock />
                            </Color.Actions>
                          )}
                          <Color.Footer>
                            <Color.Value>{valueType?.displayColor(color.value)}</Color.Value>
                          </Color.Footer>
                        </Color.Swatch>
                      </Color.Provider>
                    )}
                  </Palette.ReorderableList>
                )
              }
              if (mode === 'preview') {
                return <Palette.Gradient />
              }
            }}
          </Palette.ModeView>
        </div>
      </div>
    </Palette.Root>
  )
}
