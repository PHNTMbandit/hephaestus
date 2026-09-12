import { createFileRoute } from '@tanstack/react-router'
import { CurrentPageTitle } from '#/components/current-page-title'
import { SavedDashboard } from '#/features/favorites/components/dashboard'
import { palettesSavedByUserId } from '#/features/palette/db/live-queries'

export const Route = createFileRoute('/_secure/favorites')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    const userId = (await user).id
    dbClient.preloadLiveQuery(palettesSavedByUserId(userId))
  },
})

function RouteComponent() {
  return (
    <div className="size-full">
      <CurrentPageTitle />
      <SavedDashboard />
    </div>
  )
}
