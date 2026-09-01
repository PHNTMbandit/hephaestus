import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { Dashboard } from '#/features/my-library/components/dashboard'
import { paletteCollection } from '#/features/palette/db/collection'

export const Route = createFileRoute('/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { dbClient } }) => {
    const collection = dbClient.collection(paletteCollection)
    await collection.preload()
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
