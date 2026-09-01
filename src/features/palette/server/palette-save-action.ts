import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'
import { ZodError } from 'zod'
import { paletteSaveSchema } from '../schema/palette-save-schema'
import { savePalette } from '../utils'

export const handleSavePaletteForm = createServerFn({ method: 'POST' })
  .validator(paletteSaveSchema)
  .handler(async ({ data }) => {
    try {
      const id = crypto.randomUUID()
      const palette = await savePalette({
        data: {
          id,
          name: data.name,
          description: data.description,
          visibility: data.visibility,
          colors: JSON.parse(data.colors),
          baseColor: data.baseColor,
        },
      })
      return { success: true, id: palette.id }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: {
            form: error.message,
            fields: {},
          },
        }
      }

      setResponseStatus(500)
      return {
        success: false,
        error: {
          form: 'There was an internal error while saving the palette.',
          fields: {},
        },
      }
    }
  })
