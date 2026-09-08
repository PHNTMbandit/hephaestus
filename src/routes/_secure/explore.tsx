import { createFileRoute } from '@tanstack/react-router'
import { CurrentPageTitle } from '#/components/current-page-title'
import { ExploreDashboard } from '#/features/explore/components/dashboard'
import { publicPalettes } from '#/features/palette/db/live-queries'
import { paletteCollection } from '#/features/palette/db/palette-collection'
import { paletteSavesCollection } from '#/features/palette/db/saves-collection'

export const Route = createFileRoute('/_secure/explore')({
  component: RouteComponent,
  loader: async ({ context: { dbClient } }) => {
    const palettes = dbClient.collection(paletteCollection)
    const saves = dbClient.collection(paletteSavesCollection)
    dbClient.preloadLiveQuery(publicPalettes())
    await palettes.preload()
    await saves.preload()
  },
})

function RouteComponent() {
  return (
    <div className="size-full">
      <CurrentPageTitle />
      <ExploreDashboard />
    </div>
  )
}
