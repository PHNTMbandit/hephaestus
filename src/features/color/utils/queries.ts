import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import type { ColorNameList } from '../color.types'

export const getColorName = createServerFn()
  .validator((data: { hex: string; list?: ColorNameList; noDuplicates?: boolean }) => data)
  .handler(async ({ data }): Promise<string | null> => {
    const { hex, list, noDuplicates } = data

    try {
      const response = await fetch(
        `https://api.color.pizza/v1/?values=${hex}&list=${list ?? 'default'}&noduplicates=${noDuplicates ?? true}`,
      )
      const jsonData = await response.json()
      return jsonData.colors[0].name
    } catch {
      throw new Error('Failed to fetch color name')
    }
  })

export const colorNameQueryOptions = (hex: string, list?: ColorNameList, noDuplicates?: boolean) =>
  queryOptions({
    queryKey: ['colorName', hex],
    queryFn: () => getColorName({ data: { hex: hex.split('#')[1], list, noDuplicates } }),
  })
