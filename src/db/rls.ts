import { Pool } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from './schema'

function createRlsDb() {
  config({ path: ['.env.local', '.env'] })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL as string })
  return drizzle({ client: pool, schema })
}

let rlsDb: ReturnType<typeof createRlsDb> | undefined

function getRlsDb() {
  rlsDb ??= createRlsDb()
  return rlsDb
}

type RlsTransaction = Parameters<Parameters<ReturnType<typeof createRlsDb>['transaction']>[0]>[0]

export async function getDb<T>(userId: string, cb: (tx: RlsTransaction) => Promise<T>): Promise<T> {
  if (!userId) throw new Error('withUser requires a non-empty userId')
  return getRlsDb().transaction(async (tx) => {
    await tx.execute(
      sql`select set_config('app.user_id', ${userId}, true), set_config('role', 'authenticated', true)`,
    )
    return cb(tx)
  })
}
