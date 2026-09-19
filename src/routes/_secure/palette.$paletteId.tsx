import { SwatchesIcon } from '@phosphor-icons/react'
import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useMediaQuery } from 'dawn-ui-react'
import React from 'react'
import { Color } from '#/features/color/components/color'
import { getCompatiblePalettes } from '#/features/color/utils/style'
import { PaletteEditor } from '#/features/palette-editor/components/palette-editor'
import { Palette } from '#/features/palette/components/palette'
import { paletteById } from '#/features/palette/db/live-queries'

export const Route = createFileRoute('/_secure/palette/$paletteId')({
  component: RouteComponent,
  loader: async ({ context: { dbClient }, params: { paletteId } }) => {
    await dbClient.preloadLiveQuery(paletteById(paletteId))
  },
})

function RouteComponent() {
  const paletteId = Route.useParams().paletteId
  const { data } = useLiveSuspenseQuery(paletteById(paletteId))
  const [exportOpen, setExportOpen] = React.useState(false)
  const isMobile = useMediaQuery('tablet')

  const pairings = getCompatiblePalettes(data?.colors ?? []).slice(0, 8)

  return (
    <Palette.Root initialState={data} syncInitialState>
      <div className="flex size-full min-h-0 flex-col gap-xl overflow-y-auto px-3xl py-2xl">
        <header className="grid-cols-2 items-center gap-2xs lg:grid">
          <Palette.Name size="xxlarge" variant="strong" wrap={true} />
          <div className="flex shrink-0 items-center gap-3xs lg:place-self-end">
            <Palette.Saves size={'large'} />
            <Palette.Remix />
            <Palette.Edit />
            <Palette.Export onClick={() => setExportOpen(true)} />
          </div>
          {data?.description ? <Palette.Description size="large" variant="variant" /> : null}
          <div className="col-span-2 flex h-xl flex-wrap items-end justify-start gap-md text-on-surface-variant">
            <Palette.Author />
            <Palette.CreatedDate />
            <span className="flex items-center gap-2xs style-text-default--1 whitespace-nowrap [&>svg]:size-sm">
              <SwatchesIcon weight="bold" className="shrink-0" />
              {data?.colors.length} colors
            </span>
          </div>
        </header>

        <Palette.Swatches
          orientation={isMobile ? 'vertical' : 'horizontal'}
          rounded={'xxxlarge'}
          className="max-h-1/2"
        >
          {({ color, valueType }) => {
            return (
              <Color.Provider color={color}>
                <Color.Swatch>
                  <Color.Header>
                    <Color.Name />
                  </Color.Header>
                  <Color.Actions>
                    <Color.Copy value={valueType?.getColorClipboardFormat(color.value)} />
                  </Color.Actions>
                  <Color.Footer>
                    <Color.Value size="small" className="tabular-nums">
                      {valueType?.displayColor(color.value)}
                    </Color.Value>
                  </Color.Footer>
                </Color.Swatch>
              </Color.Provider>
            )
          }}
        </Palette.Swatches>

        {pairings.length > 0 ? (
          <section className="flex flex-col gap-3xs">
            <h2 className="style-text-strong-1 text-on-surface">Accessible pairings</h2>
            <p className="style-text-prose--1 text-on-surface-variant">
              Text/background combinations that meet WCAG AA contrast (4.5:1).
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-sm pt-sm">
              {pairings.map(({ foreground, background }) => (
                <Link
                  key={`${foreground.id}-${background.id}`}
                  to="/contrast-checker"
                  search={{ foreground: foreground.value, background: background.value }}
                >
                  <Color.PairPreview
                    foreground={foreground.value}
                    background={background.value}
                    className="hover:border-current"
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <PaletteEditor.ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </Palette.Root>
  )
}
