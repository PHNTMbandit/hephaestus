import { SignOutIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import React from 'react'
import { authClient } from '#/lib/auth-client'
import { currentUserQueryOptions } from '#/utils/auth-func'
import { m } from '@/paraglide/messages'

type SignOutProps = React.ComponentProps<'button'>

export const SignOut = ({ className, children, ref, ...props }: SignOutProps) => {
  const router = useRouter()
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)
  const [isPending, startTransition] = React.useTransition()

  if (!user) {
    return null
  }

  const handleClick = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.invalidate()
            window.location.reload()
          },
        },
      })
    })
  }

  if (isPending) {
    return (
      <Button
        disabled
        tone="error"
        variant={'ghost'}
        className={cn('w-full justify-start', className)}
        ref={ref}
        {...props}
      >
        {children}
        <SignOutIcon weight="bold" />
        {m['auth.signOut.pending']()}
      </Button>
    )
  }

  return (
    <Button
      tone="error"
      variant={'ghost'}
      onClick={handleClick}
      className={cn('w-full justify-start', className)}
      ref={ref}
      {...props}
    >
      {children}
      <SignOutIcon weight="bold" />
      {m['auth.signOut.button']()}
    </Button>
  )
}
