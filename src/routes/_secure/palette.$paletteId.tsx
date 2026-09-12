import { createFileRoute } from '@tanstack/react-router'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { paletteQueryOptions } from '#/features/palette/utils'

export const Route = createFileRoute('/_secure/palette/$paletteId')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { paletteId } }) => {
    return await queryClient.query(paletteQueryOptions(paletteId))
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="size-full">
      <Palette.Root initialState={data}>
        <Palette.Swatches className="h-1/4" orientation={'horizontal'}>
          {({ color }) => (
            <Color.Provider color={color}>
              <Color.Swatch />
            </Color.Provider>
          )}
        </Palette.Swatches>
        <div className="flex flex-col gap-2xs p-md">
          <div className="flex items-center justify-end gap-md">
            <Palette.Author />
            <Palette.CreatedDate />
            <Palette.Saves />
          </div>
          <Palette.Name size={'xxlarge'} variant={'strong'} />
          <Palette.Description />
        </div>
      </Palette.Root>
    </div>
  )
}
