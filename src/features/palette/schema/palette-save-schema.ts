import { formOptions } from '@tanstack/react-form-start'
import z from 'zod'

export const paletteVisibilities = ['public', 'unlisted', 'private'] as const

export type PaletteVisibility = (typeof paletteVisibilities)[number]

export const paletteSaveSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  description: z.string().max(200, { message: 'Description cannot exceed 200 characters' }),
  visibility: z.enum(paletteVisibilities, { error: 'Invalid visibility option' }),
  colors: z.string(),
  baseColor: z.string(),
})

export const savePaletteFormOpts = formOptions({
  defaultValues: {
    name: '',
    description: '',
    visibility: 'private' as PaletteVisibility,
    colors: '',
    baseColor: '',
  },
  validators: {
    onSubmit: paletteSaveSchema,
  },
})
