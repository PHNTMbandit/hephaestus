import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

import type { WebFont } from '../types/font-family'

const getFonts = createServerFn().handler(async (): Promise<WebFont[]> => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?capability=WOFF2&key=${process.env.GOOGLE_API_KEY}`,
    )
    const data = await res.json()
    return data.items
  } catch (error) {
    console.error('Error fetching fonts:', error)
    throw new Error('Failed to fetch fonts')
  }
})

export const fontsQueryOptions = queryOptions({
  queryKey: ['fonts'],
  queryFn: getFonts,
})
