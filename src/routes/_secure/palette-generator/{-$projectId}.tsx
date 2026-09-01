import { createFileRoute, notFound } from '@tanstack/react-router'
import { Separator } from 'dawn-ui-react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { Color } from '#/features/color/components/color.ts'
import { PaletteEditor } from '#/features/palette-editor/components/palette-editor'
import { Palette } from '#/features/palette/components/palette'
import { PALETTE_CONFIG } from '#/features/palette/constants/state.ts'
import { paletteCollection } from '#/features/palette/db/collection'
import {
  generateRandomColor,
  hydratePaletteState,
  serializePaletteState,
} from '#/features/palette/utils/index.ts'
import { getFormDataFromServer } from '#/utils/form-data'

export const Route = createFileRoute('/_secure/palette-generator/{-$projectId}')({
  component: RouteComponent,
  errorComponent: () => <p>Palette doesn't exist</p>,
  notFoundComponent: () => <p>Palette doesn't exist</p>,
  loader: async ({ context: { dbClient }, params: { projectId } }) => {
    const baseColor = generateRandomColor().value
    const newPaletteState = hydratePaletteState({ baseColor, colors: [] })
    const serializableState = serializePaletteState({
      ...newPaletteState,
      colors: newPaletteState.currentGeneratorMethod.generatePalette(
        baseColor,
        PALETTE_CONFIG.INITIAL_COLORS_COUNT,
      ),
    })
    const saveFormState = (await getFormDataFromServer()) ?? {
      errorMap: { onServer: undefined },
      errors: [],
    }

    if (!projectId) {
      return { serializableState, savedPalette: null, saveFormState }
    }

    const collection = dbClient.collection(paletteCollection)
    await collection.preload()
    const savedPalette = collection.get(projectId)

    if (projectId && !savedPalette) {
      notFound({ throw: true })
    }

    return { serializableState, savedPalette, saveFormState }
  },
})

function RouteComponent() {
  const { serializableState, savedPalette, saveFormState } = Route.useLoaderData()
  const paletteState = hydratePaletteState(savedPalette ?? serializableState)

  return (
    <Palette.Root key={savedPalette?.id ?? 'new'} initialState={paletteState}>
      <PaletteEditor.Blocker />
      <div className="relative flex size-full">
        <PaletteEditor.Panel>
          <PaletteEditor.PanelHeader>
            <CurrentPageTitle />
            <PaletteEditor.PanelTabs />
          </PaletteEditor.PanelHeader>
          <PaletteEditor.PanelContent>
            <PaletteEditor.Controls />
            <PaletteEditor.AccessibilityContent />
          </PaletteEditor.PanelContent>
        </PaletteEditor.Panel>
        <div className="flex w-full flex-col">
          <PaletteEditor.Toolbar>
            <PaletteEditor.ToolbarGroup>
              {savedPalette && <Palette.Name>{savedPalette.name}</Palette.Name>}
            </PaletteEditor.ToolbarGroup>
            <PaletteEditor.ToolbarGroup>
              <PaletteEditor.ValueSelect />
              <PaletteEditor.Undo />
              <PaletteEditor.Redo />
              <Separator orientation="vertical" className={'w-px!'} />
              <PaletteEditor.Reset />
              <PaletteEditor.Import />
              <PaletteEditor.Export />
              {savedPalette ? (
                <PaletteEditor.Update paletteId={savedPalette.id} />
              ) : (
                <PaletteEditor.Save saveFormState={saveFormState} />
              )}
            </PaletteEditor.ToolbarGroup>
          </PaletteEditor.Toolbar>
          <PaletteEditor.ModeView>
            {({ mode }) => {
              if (mode === 'list') {
                return (
                  <PaletteEditor.ReorderableColors>
                    {({ color, isDragging, valueType }) => (
                      <Color.Provider color={color}>
                        <Color.Swatch>
                          <PaletteEditor.AddColor />
                          <Color.Header>
                            <Color.Name />
                          </Color.Header>
                          {!isDragging && (
                            <Color.Actions>
                              <PaletteEditor.RemoveColor />
                              <PaletteEditor.EditColor />
                              <Color.Copy value={valueType?.getColorClipboardFormat(color.value)} />
                              <PaletteEditor.LockColor />
                            </Color.Actions>
                          )}
                          <Color.Footer>
                            <Color.Value>{valueType?.displayColor(color.value)}</Color.Value>
                          </Color.Footer>
                        </Color.Swatch>
                      </Color.Provider>
                    )}
                  </PaletteEditor.ReorderableColors>
                )
              }
              if (mode === 'preview') {
                return <Palette.Gradient />
              }
            }}
          </PaletteEditor.ModeView>
        </div>
      </div>
    </Palette.Root>
  )
}
