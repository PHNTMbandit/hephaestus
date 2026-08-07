import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_secure/explore')({
  component: RouteComponent,
  loader: async ({ context }) => context.user,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div>
      Hello {data?.username}: {data?.name}
    </div>
  )
}
