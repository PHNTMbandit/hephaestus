import { createFileRoute } from '@tanstack/react-router'
import { CurrentPageTitle } from '#/components/current-page-title'
import { MyLibraryDashboard } from '#/features/my-library/components/dashboard'
import { palettesByUserId } from '#/features/palette/db/live-queries'

export const Route = createFileRoute('/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    const session = user
    dbClient.preloadLiveQuery(palettesByUserId(session.id))
  },
})

function RouteComponent() {
  return (
    <div className="size-full">
      <CurrentPageTitle />
      <MyLibraryDashboard />
    </div>
  )
}
