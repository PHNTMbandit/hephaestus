import { createFileRoute, Link } from '@tanstack/react-router'
import { getPalettesQueryOptions } from '#/features/palette/utils/queries.ts'

export const Route = createFileRoute('/_secure/my-library')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    return await queryClient.fetchQuery(getPalettesQueryOptions)
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div>
      {data?.map((palette) => (
        <Link
          key={palette.id}
          to="/colour-palette/{-$projectId}"
          params={{ projectId: palette.id }}
        >
          <div>{palette.name}</div>
        </Link>
      ))}
    </div>
  )
}
