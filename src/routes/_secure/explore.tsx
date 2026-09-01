import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '#/features/explore/components/dashboard'
import { paletteCollection } from '#/features/palette/db/collection'

export const Route = createFileRoute('/_secure/explore')({
  component: RouteComponent,
  loader: async ({ context: { dbClient } }) => {
    const collection = dbClient.collection(paletteCollection)
    await collection.preload()
  },
})

function RouteComponent() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}
