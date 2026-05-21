import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { paletteGeneratorMethods } from './utils/generator-methods'

import type { Colour } from '../colour/colour.types'

// Re-export all utilities from the utils folder
export * from './utils'

export const initializePaletteState = createServerFn()
  .inputValidator((data: { baseColour: string }) => data)
  .handler(({ data: { baseColour } }): Colour[] => {
    return paletteGeneratorMethods.monochromatic.generatePalette(baseColour, 5)
  })

export const initialisePaletteStateQueryOptions = (baseColour: string) =>
  queryOptions({
    queryKey: ['initialPaletteState', baseColour],
    queryFn: () => initializePaletteState({ data: { baseColour } }),
  })
