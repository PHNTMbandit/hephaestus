import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { currentUserQueryOptions } from '#/utils/auth-func'
import { m } from '@/paraglide/messages'

type SignUpProps = React.ComponentProps<typeof Button>

export const SignUp = ({ className, children, ref, ...props }: SignUpProps) => {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)

  if (user) {
    return null
  }

  return (
    <Link to="/sign-up">
      <Button className={cn('w-full', className)} ref={ref} {...props}>
        {children}
        {m['auth.signUp.buttons.signUp']()}
      </Button>
    </Link>
  )
}
