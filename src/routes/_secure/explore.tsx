import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { ExploreDashboard } from '#/features/explore/components/dashboard'
import { Palette } from '#/features/palette/components/palette'
import { explorePalettes } from '#/features/palette/db/live-queries'
import { paletteSavesCollection } from '#/features/palette/db/saves-collection'

export const Route = createFileRoute('/_secure/explore')({
  component: RouteComponent,
  loader: async ({ context: { dbClient } }) => {
    await dbClient.preloadLiveQuery(explorePalettes())
    await dbClient.collection(paletteSavesCollection).preload()
  },
})

function RouteComponent() {
  return (
    <div className="flex size-full min-h-0 flex-col overflow-hidden">
      <CurrentPageTitle />
      <React.Suspense fallback={<Palette.GridSkeleton />}>
        <ExploreDashboard />
      </React.Suspense>
    </div>
  )
}
