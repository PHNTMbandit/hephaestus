import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_secure/favourites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_secure/favourites"!</div>
}
