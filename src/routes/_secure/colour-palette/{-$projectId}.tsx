import { createFileRoute } from '@tanstack/react-router'
import { Separator } from 'dawn-ui-react'
import { Colour } from '#/features/colour/components/colour.ts'
import { Palette } from '#/features/palette/components/palette.ts'
import { PALETTE_CONFIG, createPaletteState } from '#/features/palette/constants/state.ts'
import { usePalette } from '#/features/palette/hooks/use-palette.ts'
import { generateRandomColour } from '#/features/palette/utils/index.ts'

import type { SerializablePaletteState } from '#/features/palette/constants/state.ts'

export const Route = createFileRoute('/_secure/colour-palette/{-$projectId}')({
  component: RouteComponent,
  errorComponent: () => <p>Palette doesn't exist</p>,
  loader: async ({ context: { paletteCollection }, params: { projectId } }) => {
    const baseColour = generateRandomColour().value
    const { currentGeneratorMethod } = createPaletteState({
      colours: [],
      baseColour,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
    })
    const colours = currentGeneratorMethod.generatePalette(
      baseColour,
      PALETTE_CONFIG.INITIAL_COLOURS_COUNT,
    )
    const serializableState: SerializablePaletteState = {
      baseColour,
      colours,
      limit: PALETTE_CONFIG.DEFAULT_LIMIT,
      mode: PALETTE_CONFIG.DEFAULT_MODE,
    }

    if (!projectId) {
      return { serializableState, savedPalette: null }
    }

    await paletteCollection.preload()
    const savedPalette = paletteCollection.get(projectId)

    if (projectId && !savedPalette) {
      throw new Error('Palette not found')
    }

    return { serializableState, savedPalette }
  },
})

function RouteComponent() {
  const { serializableState, savedPalette } = Route.useLoaderData()
  const paletteState = createPaletteState(
    savedPalette
      ? {
          baseColour: savedPalette.baseColour,
          colours: savedPalette.colours,
          limit: PALETTE_CONFIG.DEFAULT_LIMIT,
          mode: PALETTE_CONFIG.DEFAULT_MODE,
        }
      : serializableState,
  )

  return (
    <Palette.Root initialState={paletteState}>
      <div className="relative flex size-full flex-col">
        <Palette.ModeView>
          {({ mode }) => {
            if (mode === 'list') {
              return (
                <Palette.ReorderableList>
                  {({ colour, isDragging, valueType }) => (
                    <Colour.Provider colour={colour}>
                      <Colour.Block>
                        <Palette.Add />
                        <Colour.Header>
                          <Colour.Name />
                        </Colour.Header>
                        <Colour.Footer>
                          {!isDragging && (
                            <Colour.Actions>
                              <Palette.Delete />
                              <Colour.Copy
                                value={valueType?.getColorClipboardFormat(colour.value)}
                              />
                              <Palette.Lock />
                            </Colour.Actions>
                          )}
                          <Colour.Value>{valueType?.displayColor(colour.value)}</Colour.Value>
                        </Colour.Footer>
                      </Colour.Block>
                    </Colour.Provider>
                  )}
                </Palette.ReorderableList>
              )
            }
            if (mode === 'preview') {
              const { state } = usePalette()
              const gradientStops = state.colours
                .map(
                  (colour, index) =>
                    `${colour.value} ${(index / (state.colours.length - 1)) * 100}%`,
                )
                .join(', ')

              return (
                <div className="size-full overflow-auto">
                  <div
                    className="size-full"
                    style={{
                      background: `linear-gradient(135deg, ${gradientStops})`,
                    }}
                  />
                </div>
              )
            }
          }}
        </Palette.ModeView>
        <Palette.Toolbar>
          <Palette.Generate />
          <Palette.Reset />
          <Palette.Export />
          {savedPalette ? <Palette.Update paletteId={savedPalette.id} /> : <Palette.Save />}
          <Separator orientation="vertical" variant={'strong'} className={'hidden xl:block'} />
          <Palette.Count className={'gap-0!'} />
          <Palette.BaseColour />
          <Palette.ModeToggle />
          <Palette.ValueSelect className={'min-w-fit gap-xs'} />
          <Palette.GeneratorSelect className={'min-w-fit gap-xs'} />
        </Palette.Toolbar>
      </div>
    </Palette.Root>
  )
}
