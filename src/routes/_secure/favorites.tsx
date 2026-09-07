import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Dashboard } from '#/features/favorites/dashboard'
import { savedPalettes } from '#/features/palette/db/live-queries'

export const Route = createFileRoute('/_secure/favorites')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    const userId = (await user).id
    dbClient.preloadLiveQuery(savedPalettes(userId))
  },
})

function RouteComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </React.Suspense>
  )
}
