import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import type { ColourNameList } from '../colour.types'

export const getColourName = createServerFn()
  .validator((data: { hex: string; list?: ColourNameList; noDuplicates?: boolean }) => data)
  .handler(async ({ data }): Promise<string | null> => {
    const { hex, list, noDuplicates } = data

    try {
      const response = await fetch(
        `https://api.color.pizza/v1/?values=${hex}&list=${list ?? 'default'}&noduplicates=${noDuplicates ?? true}`,
      )
      const jsonData = await response.json()
      return jsonData.colors[0].name
    } catch {
      throw new Error('Failed to fetch colour name')
    }
  })

export const colourNameQueryOptions = (
  hex: string,
  list?: ColourNameList,
  noDuplicates?: boolean,
) =>
  queryOptions({
    queryKey: ['colourName', hex],
    queryFn: () => getColourName({ data: { hex: hex.split('#')[1], list, noDuplicates } }),
  })
