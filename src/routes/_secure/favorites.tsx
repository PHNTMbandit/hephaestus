import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { SavedDashboard } from '#/features/favorites/components/dashboard'
import { Palette } from '#/features/palette/components/palette'
import { palettesSavedByUserId } from '#/features/palette/db/live-queries'
import { paletteSavesCollection } from '#/features/palette/db/saves-collection'

export const Route = createFileRoute('/_secure/favorites')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    await dbClient.preloadLiveQuery(palettesSavedByUserId(user.id))
    await dbClient.collection(paletteSavesCollection).preload()
  },
})

function RouteComponent() {
  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <CurrentPageTitle />
      <React.Suspense fallback={<Palette.GridSkeleton />}>
        <SavedDashboard />
      </React.Suspense>
    </div>
  )
}
