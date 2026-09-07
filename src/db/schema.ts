import { sql } from 'drizzle-orm'
import { crudPolicy } from 'drizzle-orm/neon'
import {
  pgTable,
  index,
  foreignKey,
  unique,
  pgEnum,
  pgView,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  pgRole,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core'

import type { Color } from '#/features/color/color.types.ts'

export const paletteVisibility = pgEnum('palette_visibility', ['public', 'unlisted', 'private'])

export const authenticatedRole = pgRole('authenticated')
export const anonymousRole = pgRole('anonymous')

const authUid = (userIdColumn: AnyPgColumn) =>
  sql`(select current_setting('app.user_id', true) = ${userIdColumn})`

export const designSystems = pgTable(
  'design_systems',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    visibility: paletteVisibility().default('private').notNull(),
    colorPaletteId: uuid('color_palette_id'),
    typographyBoardId: uuid('typography_board_id'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('design_systems_user_id_idx').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'design_systems_user_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.typographyBoardId],
      foreignColumns: [typographyBoards.id],
      name: 'design_systems_typography_board_id_fkey',
    }).onDelete('set null'),
    foreignKey({
      columns: [table.colorPaletteId],
      foreignColumns: [colorPalettes.id],
      name: 'design_systems_color_palette_id_fkey',
    }).onDelete('set null'),
    unique('design_systems_user_id_name_key').on(table.userId, table.name),
    crudPolicy({
      role: authenticatedRole,
      read: sql`(${table.visibility} <> 'private' or ${authUid(table.userId)})`,
      modify: authUid(table.userId),
    }),
    crudPolicy({
      role: anonymousRole,
      read: sql`${table.visibility} <> 'private'`,
      modify: false,
    }),
  ],
)

export const typographyBoards = pgTable(
  'typography_boards',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    visibility: paletteVisibility().default('private').notNull(),
    dataJson: jsonb('data_json').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('typography_boards_user_id_idx').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'typography_boards_user_id_fkey',
    }).onDelete('cascade'),
    unique('typography_boards_user_id_name_key').on(table.userId, table.name),
    crudPolicy({
      role: authenticatedRole,
      read: sql`(${table.visibility} <> 'private' or ${authUid(table.userId)})`,
      modify: authUid(table.userId),
    }),
    crudPolicy({
      role: anonymousRole,
      read: sql`${table.visibility} <> 'private'`,
      modify: false,
    }),
  ],
)

export const colorPalettes = pgTable(
  'color_palettes',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    description: text().default('').notNull(),
    visibility: paletteVisibility().default('private').notNull(),
    colors: jsonb().$type<Color[]>().notNull(),
    baseColor: text('base_color').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('color_palettes_user_id_idx').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'color_palettes_user_id_fkey',
    }).onDelete('cascade'),
    unique('color_palettes_user_id_name_key').on(table.userId, table.name),
    crudPolicy({
      role: authenticatedRole,
      read: sql`(${table.visibility} <> 'private' or ${authUid(table.userId)})`,
      modify: authUid(table.userId),
    }),
    crudPolicy({
      role: anonymousRole,
      read: sql`${table.visibility} <> 'private'`,
      modify: false,
    }),
  ],
)

export const colorPaletteSaves = pgTable(
  'color_palette_saves',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    colorPaletteId: uuid('color_palette_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('color_palette_saves_palette_id_idx').using(
      'btree',
      table.colorPaletteId.asc().nullsLast(),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'color_palette_saves_user_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.colorPaletteId],
      foreignColumns: [colorPalettes.id],
      name: 'color_palette_saves_palette_id_fkey',
    }).onDelete('cascade'),
    unique('color_palette_saves_user_id_palette_id_key').on(table.userId, table.colorPaletteId),
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(table.userId) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
  ],
)

export const typographyBoardSaves = pgTable(
  'typography_board_saves',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    typographyBoardId: uuid('typography_board_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('typography_board_saves_board_id_idx').using(
      'btree',
      table.typographyBoardId.asc().nullsLast(),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'typography_board_saves_user_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.typographyBoardId],
      foreignColumns: [typographyBoards.id],
      name: 'typography_board_saves_board_id_fkey',
    }).onDelete('cascade'),
    unique('typography_board_saves_user_id_board_id_key').on(table.userId, table.typographyBoardId),
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(table.userId) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
  ],
)

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
    crudPolicy({ role: authenticatedRole, read: false, modify: false }),
    crudPolicy({ role: anonymousRole, read: false, modify: false }),
  ],
)

export const user = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    username: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    image: text(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
  },
  (table) => [
    unique('user_username_unique').on(table.username),
    unique('user_email_unique').on(table.email),
    crudPolicy({ role: authenticatedRole, read: authUid(table.id), modify: authUid(table.id) }),
    crudPolicy({ role: anonymousRole, read: false, modify: false }),
  ],
)

export const userPublic = pgView('user_public').as((qb) =>
  qb
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      createdAt: user.createdAt,
    })
    .from(user),
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
    issuer: text(),
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
    crudPolicy({ role: authenticatedRole, read: false, modify: false }),
    crudPolicy({ role: anonymousRole, read: false, modify: false }),
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
    crudPolicy({ role: authenticatedRole, read: false, modify: false }),
    crudPolicy({ role: anonymousRole, read: false, modify: false }),
  ],
)
