import { createFileRoute, notFound } from '@tanstack/react-router'
import { Color } from '#/features/color/components/color.ts'
import { PalettePanelTabs } from '#/features/palette/components/palette-panel-tabs'
import { Palette } from '#/features/palette/components/palette.ts'
import { PALETTE_CONFIG, createPaletteState } from '#/features/palette/constants/state.ts'
import { generateRandomColor } from '#/features/palette/utils/index.ts'

import type { SerializablePaletteState } from '#/features/palette/constants/state.ts'

export const Route = createFileRoute('/_secure/color-palette/{-$projectId}')({
  component: RouteComponent,
  errorComponent: () => <p>Palette doesn't exist</p>,
  loader: async ({ context: { paletteCollection }, params: { projectId } }) => {
    const baseColor = generateRandomColor().value
    const { currentGeneratorMethod } = createPaletteState({
      colors: [],
      baseColor,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
    })
    const colors = currentGeneratorMethod.generatePalette(
      baseColor,
      PALETTE_CONFIG.INITIAL_COLORS_COUNT,
    )
    const serializableState: SerializablePaletteState = {
      baseColor,
      colors,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
    }

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
  const paletteState = createPaletteState(
    savedPalette
      ? {
          baseColor: savedPalette.baseColor,
          colors: savedPalette.colors,
          limit: PALETTE_CONFIG.DEFAULT_LIMIT,
          mode: PALETTE_CONFIG.DEFAULT_MODE,
        }
      : serializableState,
  )

  return (
    <Palette.Root key={savedPalette?.id ?? 'new'} initialState={paletteState}>
      <div className="relative flex size-full">
        <Palette.Panel>
          <Palette.PanelHeader>
            <PalettePanelTabs />
          </Palette.PanelHeader>
          <Palette.PanelContent>
            <Palette.GeneratorContent />
          </Palette.PanelContent>
        </Palette.Panel>
        <div className="flex w-full flex-col">
          <Palette.Toolbar>
            <Palette.ToolbarGroup>
              <Palette.ProjectSelect value={savedPalette?.id || ''} />
            </Palette.ToolbarGroup>
            <Palette.ToolbarGroup>
              <Palette.ValueSelect />
              <Palette.Undo />
              <Palette.Redo />
              <Palette.Export />
              <Palette.Reset />
              <Palette.Save />
            </Palette.ToolbarGroup>
          </Palette.Toolbar>
          <Palette.ModeView>
            {({ mode }) => {
              if (mode === 'list') {
                return (
                  <Palette.ReorderableList>
                    {({ color, isDragging, valueType }) => (
                      <Color.Provider color={color}>
                        <Color.Block>
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
                        </Color.Block>
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
