import { usernameClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const { useSession, signIn, signOut, signUp, getSession } = createAuthClient({
  plugins: [usernameClient()],
})
