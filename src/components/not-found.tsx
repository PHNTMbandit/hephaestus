import { Link } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'

type NotFoundProps = React.ComponentProps<'div'>

export const NotFound = ({ className, children, ref, ...props }: NotFoundProps) => {
  return (
    <div
      className={cn('flex size-full flex-col items-center justify-center gap-md', className)}
      ref={ref}
      {...props}
    >
      {children}
      <span className="style-text-strong-2">Page not found</span>
      <Link to="/">
        <Button variant="ghost" tone="neutral">
          Go back home
        </Button>
      </Link>
    </div>
  )
}
