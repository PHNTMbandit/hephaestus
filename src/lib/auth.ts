import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'
import { username } from 'better-auth/plugins/username'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '#/db/index'
import { account, session, user, verification } from '#/db/schema.ts'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              username: user.name.toLowerCase().replace(/\s+/g, '-'),
            },
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // 1 hour
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [username(), tanstackStartCookies()],
})
