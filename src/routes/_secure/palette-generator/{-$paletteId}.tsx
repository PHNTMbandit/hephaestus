import { ListIcon } from '@phosphor-icons/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Separator, SidebarProvider, SidebarToggle } from 'dawn-ui-react'
import z, { ZodError } from 'zod'
import { CurrentPageTitle } from '#/components/current-page-title'
import { Color } from '#/features/color/components/color.ts'
import { PaletteEditor } from '#/features/palette-editor/components/palette-editor'
import { Palette } from '#/features/palette/components/palette'
import { PALETTE_CONFIG } from '#/features/palette/constants/state.ts'
import { paletteCollection } from '#/features/palette/db/palette-collection'
import {
  generateRandomColor,
  hydratePaletteState,
  serializePaletteState,
} from '#/features/palette/utils/index.ts'
import { getFormDataFromServer } from '#/utils/form-data'

export const paletteSearchSchema = z.object({
  colors: z.preprocess(
    (value) => {
      if (value === '[]' || (Array.isArray(value) && value.length === 0)) return undefined
      return Array.isArray(value) ? value.join('-') : value
    },
    z
      .string()
      .regex(/^(?:#?[0-9a-f]{6})(?:-#?[0-9a-f]{6})*$/i)
      .transform((value) =>
        value
          .split('-')
          .map((color) => color.replace(/^#/, '').toLowerCase())
          .join('-'),
      )
      .refine(
        (value) => {
          if (!value) return true
          return /^([0-9a-f]{6})(?:-([0-9a-f]{6}))*$/i.test(value)
        },
        {
          message: 'Invalid color format',
        },
      )
      .optional(),
  ),
})

export const Route = createFileRoute('/_secure/palette-generator/{-$paletteId}')({
  component: RouteComponent,
  errorComponent: ({ error }) => <p>{(error as ZodError).message}</p>,
  notFoundComponent: () => <p>Palette doesn't exist</p>,
  validateSearch: paletteSearchSchema,
  loaderDeps: ({ search: { colors } }) => ({
    colors: colors?.split('-').map((color) => `#${color}`) ?? [],
  }),
  loader: async ({ context: { dbClient }, params: { paletteId }, deps: { colors } }) => {
    const baseColor = colors[0] ?? generateRandomColor().value
    const newPaletteState = hydratePaletteState({
      baseColor,
      colors: colors.map((color, id) => ({ id: String(id), value: color, locked: false })),
    })
    const serializableState = serializePaletteState({
      ...newPaletteState,
      colors:
        newPaletteState.colors.length > 0
          ? newPaletteState.colors
          : newPaletteState.currentGeneratorMethod.generatePalette(
              baseColor,
              PALETTE_CONFIG.INITIAL_COLORS_COUNT,
            ),
    })
    const publishFormState = (await getFormDataFromServer()) ?? {
      errorMap: { onServer: undefined },
      errors: [],
    }

    if (!paletteId) {
      return { serializableState, savedPalette: null, publishFormState }
    }

    const collection = dbClient.collection(paletteCollection)
    await collection.preload()
    const savedPalette = collection.get(paletteId)

    if (paletteId && !savedPalette) {
      notFound({ throw: true })
    }

    return { serializableState, savedPalette, publishFormState }
  },
})

function RouteComponent() {
  const { serializableState, savedPalette, publishFormState } = Route.useLoaderData()
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
            <PaletteEditor.ControlsContent />
            <PaletteEditor.AccessibilityContent />
            <PaletteEditor.PreviewContent />
          </PaletteEditor.PanelContent>
        </PaletteEditor.Panel>
        <SidebarProvider collapsible="offcanvas" defaultOpen={false} id={'library'}>
          <PaletteEditor.LibrarySidebar />
          <div className="flex w-full flex-col">
            <PaletteEditor.Toolbar>
              <PaletteEditor.ToolbarGroup>
                <SidebarToggle>
                  {(isExpanded) => {
                    return isExpanded ? (
                      <ListIcon weight="bold" className="rotate-90" />
                    ) : (
                      <ListIcon weight="bold" />
                    )
                  }}
                </SidebarToggle>
                <Palette.Name />
              </PaletteEditor.ToolbarGroup>
              <PaletteEditor.ToolbarGroup>
                <PaletteEditor.Undo />
                <PaletteEditor.Redo />
                <Separator orientation="vertical" className={'h-md! w-px!'} />
                <PaletteEditor.Reset />
                <PaletteEditor.Import />
                <PaletteEditor.ExportDialog>
                  <PaletteEditor.ExportTrigger />
                </PaletteEditor.ExportDialog>
                {savedPalette ? (
                  <PaletteEditor.Update paletteId={savedPalette.id} />
                ) : (
                  <PaletteEditor.Publish publishFormState={publishFormState} />
                )}
              </PaletteEditor.ToolbarGroup>
            </PaletteEditor.Toolbar>
            <PaletteEditor.RenderMode>
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
                                <PaletteEditor.Shades />
                                <Color.Copy
                                  value={valueType?.getColorClipboardFormat(color.value)}
                                />
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
                if (mode === 'gradient') {
                  return <Palette.Gradient />
                }
                if (mode === 'swatches') {
                  return (
                    <Palette.Swatches orientation="horizontal">
                      {({ color }) => (
                        <Color.Provider color={color}>
                          <Color.Swatch />
                        </Color.Provider>
                      )}
                    </Palette.Swatches>
                  )
                }
                if (mode === 'blocks') {
                  return (
                    <Palette.Swatches orientation="horizontal">
                      {({ color, valueType }) => (
                        <Color.Provider color={color}>
                          <Color.Swatch>
                            <Color.Footer>
                              <Color.Value>{valueType?.displayColor(color.value)}</Color.Value>
                            </Color.Footer>
                          </Color.Swatch>
                        </Color.Provider>
                      )}
                    </Palette.Swatches>
                  )
                }
              }}
            </PaletteEditor.RenderMode>
          </div>
        </SidebarProvider>
      </div>
    </Palette.Root>
  )
}
