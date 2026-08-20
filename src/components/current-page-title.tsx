import { useRouter } from '@tanstack/react-router'
import { cn } from 'dawn-ui-react'
import { getClientRoute } from '#/utils/client-route'

type CurrentPageTitleProps = React.ComponentProps<'div'>

export const CurrentPageTitle = ({ className, children, ref, ...props }: CurrentPageTitleProps) => {
  const navigate = useRouter()
  const route = getClientRoute(navigate.state.location.pathname)
  const LeadingIcon = route?.leadingIcon

  return (
    <div
      className={cn(
        'flex h-2xl w-full items-center gap-xs border-b border-border pl-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      {LeadingIcon && <LeadingIcon weight="bold" className="size-md" />}
      <span className="style-text-strong-1">{route?.label}</span>
    </div>
  )
}
