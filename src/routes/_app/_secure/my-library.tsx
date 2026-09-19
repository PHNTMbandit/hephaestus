import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { MyLibraryDashboard } from '#/features/my-library/components/dashboard'
import { Palette } from '#/features/palette/components/palette'
import { palettesByUserId } from '#/features/palette/db/live-queries'
import { paletteSavesCollection } from '#/features/palette/db/saves-collection'

export const Route = createFileRoute('/_app/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    await dbClient.preloadLiveQuery(palettesByUserId(user.id))
    await dbClient.collection(paletteSavesCollection).preload()
  },
})

function RouteComponent() {
  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <CurrentPageTitle />
      <React.Suspense fallback={<Palette.GridSkeleton />}>
        <MyLibraryDashboard />
      </React.Suspense>
    </div>
  )
}
