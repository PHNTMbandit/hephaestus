import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import type { ColorNameList } from '../color.types'

export const getColorName = createServerFn()
  .validator((data: { hex: string; list?: ColorNameList; noDuplicates?: boolean }) => data)
  .handler(async ({ data }): Promise<string | null> => {
    const { hex, list, noDuplicates } = data

    const response = await fetch(
      `https://api.color.pizza/v1/?values=${hex}&list=${list ?? 'default'}&noduplicates=${noDuplicates ?? true}`,
    )

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error(`color.pizza request failed: ${response.status} ${response.statusText}`, body)
      throw new Error(`Failed to fetch color name (${response.status})`)
    }

    const jsonData = await response.json()
    const name = jsonData.colors?.[0]?.name

    if (!name) {
      console.error('color.pizza returned no colors for hex:', hex, jsonData)
      throw new Error('Failed to fetch color name')
    }

    return name
  })

export const colorNameQueryOptions = (hex: string, list?: ColorNameList, noDuplicates?: boolean) =>
  queryOptions({
    queryKey: ['colorName', hex],
    queryFn: () => getColorName({ data: { hex: hex.split('#')[1], list, noDuplicates } }),
  })
