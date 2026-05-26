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
    const baseColour = generateRandomColour().value
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
      <div className="flex flex-wrap items-center gap-sm p-md">
        <Palette.Generate className="grow" />
        <Palette.Recalibrate className="grow" />
        <Palette.Export className="grow" />
        <Palette.BaseColour className="grow" />
        <Palette.Count className="grow" />
        <Palette.ValueSelect className="grow" />
        <Palette.GeneratorSelect className="grow" />
      </div>
    </Palette.Provider>
  )
}
