import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_secure/favorites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_secure/favourites"!</div>
}
