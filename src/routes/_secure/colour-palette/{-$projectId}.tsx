import { createFileRoute } from '@tanstack/react-router'
import { Palette } from '#/features/palette/components/palette.ts'
import {
  generateRandomColour,
  getPaletteQueryOptions,
  initialisePaletteStateQueryOptions,
  paletteGeneratorMethods,
  valueTypes,
} from '#/features/palette/utils/index.ts'

export const Route = createFileRoute('/_secure/colour-palette/{-$projectId}')({
  component: RouteComponent,
  errorComponent: () => <p>Palette doesn't exist</p>,
  loader: async ({ context: { queryClient }, params: { projectId } }) => {
    const baseColour = generateRandomColour().value
    const defaultPalette = await queryClient.ensureQueryData(
      initialisePaletteStateQueryOptions(baseColour),
    )
    const savedPalette = await queryClient.ensureQueryData(getPaletteQueryOptions(projectId ?? ''))

    if (projectId && !savedPalette) {
      throw new Error('Palette not found')
    }
    return { baseColour, defaultPalette, savedPalette }
  },
})

function RouteComponent() {
  const { baseColour, defaultPalette, savedPalette } = Route.useLoaderData()

  return (
    <Palette.Provider
      initialState={{
        baseColour: baseColour,
        colours: savedPalette ? savedPalette.colours : defaultPalette,
        currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
        limit: 10,
        valueType: valueTypes.rgb,
      }}
    >
      <Palette.List />
      <div className="flex flex-wrap items-center gap-sm p-md">
        <Palette.Generate className="grow" />
        <Palette.Recalibrate className="grow" />
        <Palette.Export className="grow" />
        {savedPalette ? (
          <Palette.Update paletteId={savedPalette.id} className="grow" />
        ) : (
          <Palette.Save className="grow" />
        )}
        <Palette.BaseColour className="grow" />
        <Palette.Count className="grow" />
        <Palette.ValueSelect className="grow" />
        <Palette.GeneratorSelect className="grow" />
      </div>
    </Palette.Provider>
  )
}
