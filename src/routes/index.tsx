import { createFileRoute, Link } from '@tanstack/react-router'
import { ThemeToggle } from '#/components/theme-toggle'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div>
      <ThemeToggle />
      <Link to="/sign-in" className="text-brand-default hover:underline">
        Sign In
      </Link>
    </div>
  )
}
