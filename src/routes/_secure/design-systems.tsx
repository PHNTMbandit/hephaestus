import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_secure/design-systems')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_secure/design-systems"!</div>
}
