import {
  pgTable,
  index,
  text,
  timestamp,
  unique,
  boolean,
  foreignKey,
  pgPolicy,
  serial,
  uuid,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core'

export const tokenCategory = pgEnum('token_category', ['primitive', 'semantic', 'component'])

export const verification = pgTable(
  'verification',
  {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    index('verification_identifier_idx').using(
      'btree',
      table.identifier.asc().nullsLast().op('text_ops'),
    ),
  ],
)

export const user = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    image: text(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [unique('user_email_unique').on(table.email)],
)

export const account = pgTable(
  'account',
  {
    id: text().primaryKey().notNull(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at', { mode: 'string' }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { mode: 'string' }),
    scope: text(),
    password: text(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
  },
  (table) => [
    index('account_userId_idx').using('btree', table.userId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'account_user_id_user_id_fk',
    }).onDelete('cascade'),
  ],
)

export const session = pgTable(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull(),
  },
  (table) => [
    index('session_userId_idx').using('btree', table.userId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'session_user_id_user_id_fk',
    }).onDelete('cascade'),
    unique('session_token_unique').on(table.token),
  ],
)

export const projects = pgTable(
  'projects',
  {
    id: serial().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    isPrivate: boolean('is_private').default(true).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'projects_user_id_fkey',
    }).onDelete('cascade'),
    pgPolicy('select own projects', { as: 'permissive', for: 'select', to: ['public'] }),
    pgPolicy('insert own projects', { as: 'permissive', for: 'insert', to: ['public'] }),
    pgPolicy('delete own projects', { as: 'permissive', for: 'delete', to: ['public'] }),
    pgPolicy('update own projects', { as: 'permissive', for: 'update', to: ['public'] }),
  ],
)

export const designTokens = pgTable(
  'design_tokens',
  {
    id: uuid().primaryKey().notNull(),
    projectId: serial('project_id').notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    category: tokenCategory().notNull(),
    groupName: text('group_name').notNull(),
    aliasOf: uuid('alias_of'),
    value: jsonb(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.projectId],
      foreignColumns: [projects.id],
      name: 'design_tokens_project_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'design_tokens_user_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.aliasOf],
      foreignColumns: [table.id],
      name: 'design_tokens_alias_of_fkey',
    }).onDelete('set null'),
    unique('design_tokens_project_id_name_key').on(table.projectId, table.name),
    pgPolicy('update own design tokens', { as: 'permissive', for: 'update', to: ['public'] }),
    pgPolicy('delete own design tokens', { as: 'permissive', for: 'delete', to: ['public'] }),
    pgPolicy('insert own design tokens', { as: 'permissive', for: 'insert', to: ['public'] }),
  ],
)
