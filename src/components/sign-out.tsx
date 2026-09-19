import { SignOutIcon } from '@phosphor-icons/react'
import { useRouter } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import React from 'react'
import { authClient } from '#/lib/auth-client'

type SignOutProps = React.ComponentProps<'button'>

export const SignOut = ({ className, children, ref, ...props }: SignOutProps) => {
  const router = useRouter()
  const { data } = authClient.useSession()
  const [isPending, startTransition] = React.useTransition()

  if (!data) {
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
        Signing out...
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
      Sign out
    </Button>
  )
}
