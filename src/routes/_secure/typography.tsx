import { createFileRoute } from '@tanstack/react-router'
import { Typography } from '#/features/typography/components/typography.ts'
import { defaultTypographyState } from '#/features/typography/constants/state.ts'
import { fontsQueryOptions } from '#/features/typography/utils/queries.ts'

export const Route = createFileRoute('/_secure/typography')({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(fontsQueryOptions)
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <Typography.Provider initialState={defaultTypographyState}>
      <Typography.FontFamily fonts={data} />
      <Typography.Scale />
      <Typography.FontSize />
      <Typography.FontWeight />
      <Typography.LineHeight />
      <Typography.LetterSpacing />
      <Typography.Colour />
      <Typography.Background />
      <Typography.Preview />
    </Typography.Provider>
  )
}
