import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Dashboard } from '#/features/explore/components/dashboard'
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
    <React.Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </React.Suspense>
  )
}
