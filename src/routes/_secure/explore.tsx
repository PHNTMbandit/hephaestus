import { createFileRoute } from '@tanstack/react-router'
import { CurrentPageTitle } from '#/components/current-page-title'
import { ExploreDashboard } from '#/features/explore/components/dashboard'
import { paletteSavesCollection } from '#/features/palette/db/saves-collection'
import { palettesQueryOptions } from '#/features/palette/utils'

export const Route = createFileRoute('/_secure/explore')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, queryClient } }) => {
    const data = queryClient.query(palettesQueryOptions)
    const saves = dbClient.collection(paletteSavesCollection)
    await saves.preload()

    return data
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="flex size-full min-h-0 max-w-full min-w-0 flex-col overflow-hidden">
      <CurrentPageTitle />
      <ExploreDashboard data={data} />
    </div>
  )
}
