import { QueryClient } from '@tanstack/react-query'
import { paletteCollection } from '#/features/palette/db/collection'

export function getContext() {
  const queryClient = new QueryClient()
  const collection = paletteCollection(queryClient)

  return {
    queryClient,
    paletteCollection: collection,
  }
}
export default function TanstackQueryProvider() {}
