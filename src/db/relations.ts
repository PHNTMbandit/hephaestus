import { relations } from 'drizzle-orm/relations'
import { user, account, session, projects, designTokens } from './schema'

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  projects: many(projects),
  designTokens: many(designTokens),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
  designTokens: many(designTokens),
}))

export const designTokensRelations = relations(designTokens, ({ one, many }) => ({
  project: one(projects, {
    fields: [designTokens.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [designTokens.userId],
    references: [user.id],
  }),
  designToken: one(designTokens, {
    fields: [designTokens.aliasOf],
    references: [designTokens.id],
    relationName: 'designTokens_aliasOf_designTokens_id',
  }),
  designTokens: many(designTokens, {
    relationName: 'designTokens_aliasOf_designTokens_id',
  }),
}))
