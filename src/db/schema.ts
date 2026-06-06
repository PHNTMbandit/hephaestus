import {
  pgTable,
  index,
  foreignKey,
  unique,
  pgPolicy,
  uuid,
  text,
  jsonb,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

export const colourPalettes = pgTable(
  'colour_palettes',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    dataJson: jsonb('data_json').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('colour_palettes_user_id_idx').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'colour_palettes_user_id_fkey',
    }).onDelete('cascade'),
    unique('colour_palettes_user_id_name_key').on(table.userId, table.name),
    pgPolicy('delete own colour palettes', { as: 'permissive', for: 'delete', to: ['public'] }),
    pgPolicy('update own colour palettes', { as: 'permissive', for: 'update', to: ['public'] }),
    pgPolicy('insert own colour palettes', { as: 'permissive', for: 'insert', to: ['public'] }),
    pgPolicy('select own colour palettes', { as: 'permissive', for: 'select', to: ['public'] }),
  ],
)

export const designSystems = pgTable(
  'design_systems',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
    colourPaletteId: uuid('colour_palette_id'),
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
      columns: [table.colourPaletteId],
      foreignColumns: [colourPalettes.id],
      name: 'design_systems_colour_palette_id_fkey',
    }).onDelete('set null'),
    foreignKey({
      columns: [table.typographyBoardId],
      foreignColumns: [typographyBoards.id],
      name: 'design_systems_typography_board_id_fkey',
    }).onDelete('set null'),
    unique('design_systems_user_id_name_key').on(table.userId, table.name),
    pgPolicy('delete own design systems', { as: 'permissive', for: 'delete', to: ['public'] }),
    pgPolicy('update own design systems', { as: 'permissive', for: 'update', to: ['public'] }),
    pgPolicy('insert own design systems', { as: 'permissive', for: 'insert', to: ['public'] }),
    pgPolicy('select own design systems', { as: 'permissive', for: 'select', to: ['public'] }),
  ],
)

export const typographyBoards = pgTable(
  'typography_boards',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text().notNull(),
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
    pgPolicy('delete own typography boards', { as: 'permissive', for: 'delete', to: ['public'] }),
    pgPolicy('update own typography boards', { as: 'permissive', for: 'update', to: ['public'] }),
    pgPolicy('insert own typography boards', { as: 'permissive', for: 'insert', to: ['public'] }),
    pgPolicy('select own typography boards', { as: 'permissive', for: 'select', to: ['public'] }),
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
  ],
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
