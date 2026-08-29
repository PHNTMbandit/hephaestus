import { DbClient } from '@tanstack/db'
import { QueryClient } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient()
  const dbClient = new DbClient({ queryClient })

  return {
    queryClient,
    dbClient,
  }
}
export default function TanstackQueryProvider() {}
