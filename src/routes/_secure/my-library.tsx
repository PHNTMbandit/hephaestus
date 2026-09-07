import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Dashboard } from '#/features/my-library/components/dashboard'
import { userPalettes } from '#/features/palette/db/live-queries'

export const Route = createFileRoute('/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { dbClient, user } }) => {
    const session = await user
    dbClient.preloadLiveQuery(userPalettes(session.id))
  },
})

function RouteComponent() {
  return (
    <section className="size-full">
      <React.Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </React.Suspense>
    </section>
  )
}
