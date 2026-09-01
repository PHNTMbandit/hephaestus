import { z } from 'zod'
import { valueTypes } from '../constants/values'

const valueTypeIds = Object.keys(valueTypes) as [
  keyof typeof valueTypes,
  ...(keyof typeof valueTypes)[],
]

export const paletteImportSchema = z.object({
  valueType: z.enum(valueTypeIds, { error: 'Invalid value type' }),
  values: z.string().min(1, { message: 'Values cannot be empty' }),
})
