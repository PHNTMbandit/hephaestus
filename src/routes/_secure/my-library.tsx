import { useLiveQuery } from '@tanstack/react-db'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Color } from '#/features/color/components/color.ts'
import { Palette } from '#/features/palette/components/palette.ts'
import { hydratePaletteState } from '#/features/palette/utils/state.ts'

export const Route = createFileRoute('/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { paletteCollection } }) => {
    await paletteCollection.preload()
  },
})

function RouteComponent() {
  const { paletteCollection } = Route.useRouteContext()
  const { data } = useLiveQuery((q) => q.from({ palette: paletteCollection }))

  return (
    <section className="size-full">
      <div className="grid auto-rows-[100px] grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-sm p-md">
        {data?.map((palette) => (
          <Link
            key={palette.id}
            to="/color-palette/{-$projectId}"
            params={{ projectId: palette.id }}
          >
            <Palette.Root initialState={hydratePaletteState(palette)}>
              <Palette.List orientation={'horizontal'} rounded="xxLarge">
                {({ color }) => (
                  <Color.Provider color={color}>
                    <Color.Block />
                  </Color.Provider>
                )}
              </Palette.List>
            </Palette.Root>
          </Link>
        ))}
      </div>
    </section>
  )
}
