import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { currentUserQueryOptions } from '#/utils/auth-func'
import { m } from '@/paraglide/messages'

type SignInProps = React.ComponentProps<typeof Button>

export const SignIn = ({ className, children, ref, ...props }: SignInProps) => {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)

  if (user) {
    return null
  }

  return (
    <Link to="/sign-in">
      <Button variant={'ghost'} className={cn('w-full', className)} ref={ref} {...props}>
        {children}
        {m['auth.signIn.buttons.signIn']()}
      </Button>
    </Link>
  )
}
