import { CircleNotchIcon } from '@phosphor-icons/react/dist/ssr'
import { Button, cn } from 'dawn-ui-react'
import React from 'react'
import { signIn } from '#/lib/auth-client.ts'
import { m } from '#/paraglide/messages.js'

type FigmaSSOProps = React.ComponentProps<'button'>

export const FigmaSSO = ({ className, children, ref, ...props }: FigmaSSOProps) => {
  const [pending, setPending] = React.useState(false)

  const handleClick = async () => {
    try {
      await signIn.social(
        {
          provider: 'figma',
          callbackURL: '/explore',
        },
        {
          onRequest: () => {
            setPending(true)
          },
          onSuccess: () => {
            setPending(false)
          },
          onError: () => {
            setPending(false)
          },
        },
      )
    } catch {
      throw new Error('Failed to sign in with Figma')
    }
  }

  if (pending) {
    return (
      <Button
        onClick={handleClick}
        tone="neutral"
        variant="outline"
        className={cn(pending && 'cursor-not-allowed opacity-50', className)}
        ref={ref}
        disabled={pending}
        {...props}
      >
        <CircleNotchIcon className={cn('animate-spin')} />
      </Button>
    )
  }

  return (
    <Button
      variant={'outline'}
      onClick={handleClick}
      tone="neutral"
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="figma">
        <path
          fill="#0ACF83"
          d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"
        ></path>
        <path fill="#A259FF" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"></path>
        <path fill="#F24E1E" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"></path>
        <path fill="#FF7262" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"></path>
        <path
          fill="#1ABCFE"
          d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"
        ></path>
      </svg>
      {m['auth.signIn.buttons.sso.figma']()}
    </Button>
  )
}
