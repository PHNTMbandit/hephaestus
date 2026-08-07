import { KeyIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'
import { signIn } from '#/lib/auth-client.ts'
import { m } from '#/paraglide/messages.js'

type PasskeyProps = React.ComponentProps<'button'>

export const Passkey = ({ className, children, ref, ...props }: PasskeyProps) => {
  const handleClick = async () => {
    try {
      await signIn.social({
        provider: 'apple',
      })
    } catch {
      throw new Error('Failed to sign in with Apple')
    }
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
      <KeyIcon weight="bold" />
      {m['auth.signIn.buttons.sso.passkey']()}
    </Button>
  )
}
