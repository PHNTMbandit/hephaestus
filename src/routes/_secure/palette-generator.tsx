import { createFileRoute } from '@tanstack/react-router'
import { Palette } from '#/features/palette/components/palette.ts'
import {
  generateRandomColour,
  initialisePaletteStateQueryOptions,
  paletteGeneratorMethods,
  valueTypes,
} from '#/features/palette/palette.utils.ts'

export const Route = createFileRoute('/_secure/palette-generator')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const baseColour = generateRandomColour().hex
    const defaultPalette = await context.queryClient.ensureQueryData(
      initialisePaletteStateQueryOptions(baseColour),
    )
    return { baseColour, defaultPalette }
  },
})

function RouteComponent() {
  const { baseColour, defaultPalette } = Route.useLoaderData()

  return (
    <Palette.Provider
      initialState={{
        baseColour: baseColour,
        colours: defaultPalette,
        currentGeneratorMethod: paletteGeneratorMethods.monochromatic,
        limit: 10,
        valueType: valueTypes.rgb,
      }}
    >
      <Palette.List />
      <Palette.Generate />
      <Palette.Recalibrate />
      <Palette.BaseColour />
      <Palette.Count />
      <Palette.ValueSelect />
    </Palette.Provider>
  )
}
