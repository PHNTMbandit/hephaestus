import { ThemeToggle } from '#/components/theme-toggle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div>
      <ThemeToggle />
    </div>
  )
}
