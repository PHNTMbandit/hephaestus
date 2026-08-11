import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { betterAuth } from 'better-auth'
import { oAuthProxy } from 'better-auth/plugins'
import { username } from 'better-auth/plugins/username'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '#/db/index'
import { account, session, user, verification } from '#/db/schema.ts'

export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      'localhost:3000',
      'localhost:5173',
      'hephaestus-one.vercel.app',
      'www.hephaestus-one.vercel.app',
      '*.vercel.app',
    ],
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
  },
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
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ['https://hephaestus-one.vercel.app', 'http://localhost:3000'],
  plugins: [
    oAuthProxy({
      productionURL: 'https://hephaestus-one.vercel.app',
      secret: process.env.OAUTH_PROXY_SECRET as string,
    }),
    username(),
    tanstackStartCookies(),
  ],
})
