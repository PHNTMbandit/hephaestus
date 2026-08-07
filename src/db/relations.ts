import { relations } from 'drizzle-orm/relations'
import { user, designSystems, typographyBoards, colorPalettes, account, session } from './schema'

export const designSystemsRelations = relations(designSystems, ({ one }) => ({
  user: one(user, {
    fields: [designSystems.userId],
    references: [user.id],
  }),
  typographyBoard: one(typographyBoards, {
    fields: [designSystems.typographyBoardId],
    references: [typographyBoards.id],
  }),
  colorPalette: one(colorPalettes, {
    fields: [designSystems.colorPaletteId],
    references: [colorPalettes.id],
  }),
}))

export const userRelations = relations(user, ({ many }) => ({
  designSystems: many(designSystems),
  typographyBoards: many(typographyBoards),
  colorPalettes: many(colorPalettes),
  accounts: many(account),
  sessions: many(session),
}))

export const typographyBoardsRelations = relations(typographyBoards, ({ one, many }) => ({
  designSystems: many(designSystems),
  user: one(user, {
    fields: [typographyBoards.userId],
    references: [user.id],
  }),
}))

export const colorPalettesRelations = relations(colorPalettes, ({ one, many }) => ({
  designSystems: many(designSystems),
  user: one(user, {
    fields: [colorPalettes.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))
