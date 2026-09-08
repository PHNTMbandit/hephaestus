import { createFileRoute } from '@tanstack/react-router'
import { CurrentPageTitle } from '#/components/current-page-title'

export const Route = createFileRoute('/_secure/spacing')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="size-full">
      <CurrentPageTitle />
    </div>
  )
}
