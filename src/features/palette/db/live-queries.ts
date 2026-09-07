import { and, eq, type InitialQueryBuilder } from '@tanstack/db'
import { paletteCollection } from './palette-collection'
import { paletteSavesCollection } from './saves-collection'

export const publicPalettes = () => ({
  query: (q: InitialQueryBuilder) =>
    q
      .from({ palette: paletteCollection })
      .where(({ palette }) => eq(palette.visibility, 'public'))
      .orderBy(({ palette }) => palette.createdAt, 'asc'),
})

export const userPalettes = (userId: string) => ({
  query: (q: InitialQueryBuilder) =>
    q
      .from({ palette: paletteCollection })
      .where(({ palette }) => eq(palette.userId, userId))
      .orderBy(({ palette }) => palette.createdAt, 'asc'),
})

export const savedPalettes = (userId: string) => ({
  query: (q: InitialQueryBuilder) =>
    q
      .from({ saves: paletteSavesCollection })
      .join({ palettes: paletteCollection }, ({ saves, palettes }) =>
        eq(saves.colorPaletteId, palettes.id),
      )
      .where(({ saves }) => eq(saves.userId, userId))
      .select(({ palettes }) => ({ ...palettes })),
})

export const paletteSaveCount = (paletteId: string) => ({
  query: (q: InitialQueryBuilder) =>
    q
      .from({ save: paletteSavesCollection })
      .where(({ save }) => eq(save.colorPaletteId, paletteId)),
})

export const userPaletteSave = (paletteId: string, userId: string) => ({
  query: (q: InitialQueryBuilder) =>
    q
      .from({ save: paletteSavesCollection })
      .where(({ save }) => and(eq(save.colorPaletteId, paletteId), eq(save.userId, userId)))
      .select(({ save }) => ({ id: save.id })),
})
