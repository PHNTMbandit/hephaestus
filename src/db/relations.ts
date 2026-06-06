import { relations } from 'drizzle-orm/relations'
import { user, colourPalettes, designSystems, typographyBoards, account, session } from './schema'

export const colourPalettesRelations = relations(colourPalettes, ({ one, many }) => ({
  user: one(user, {
    fields: [colourPalettes.userId],
    references: [user.id],
  }),
  designSystems: many(designSystems),
}))

export const userRelations = relations(user, ({ many }) => ({
  colourPalettes: many(colourPalettes),
  designSystems: many(designSystems),
  typographyBoards: many(typographyBoards),
  accounts: many(account),
  sessions: many(session),
}))

export const designSystemsRelations = relations(designSystems, ({ one }) => ({
  user: one(user, {
    fields: [designSystems.userId],
    references: [user.id],
  }),
  colourPalette: one(colourPalettes, {
    fields: [designSystems.colourPaletteId],
    references: [colourPalettes.id],
  }),
  typographyBoard: one(typographyBoards, {
    fields: [designSystems.typographyBoardId],
    references: [typographyBoards.id],
  }),
}))

export const typographyBoardsRelations = relations(typographyBoards, ({ one, many }) => ({
  designSystems: many(designSystems),
  user: one(user, {
    fields: [typographyBoards.userId],
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
