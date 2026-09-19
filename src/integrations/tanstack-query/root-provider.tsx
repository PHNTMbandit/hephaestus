import { DbClient } from '@tanstack/db'
import { defaultShouldDehydrateQuery } from '@tanstack/query-core'
import { QueryClient } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        // On-demand collection subset queries stash non-serializable request
        // context (AbortSignal + expression AST) on `meta`, which seroval can't
        // serialize. Skip them; the client re-loads each subset on demand.
        shouldDehydrateQuery: (query) =>
          query.queryKey[0] !== 'paletteCollection' && defaultShouldDehydrateQuery(query),
      },
    },
  })
  const dbClient = new DbClient({ queryClient })

  return {
    queryClient,
    dbClient,
  }
}
export default function TanstackQueryProvider() {}
