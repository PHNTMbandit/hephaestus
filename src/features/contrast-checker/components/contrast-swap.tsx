import { ArrowsDownUpIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'
import { useContrastChecker } from '../hooks/use-contrast-checker'

type ContrastSwapProps = React.ComponentProps<typeof Button>

export const ContrastSwap = ({ className, children, ref, ...props }: ContrastSwapProps) => {
  const { dispatch } = useContrastChecker()

  return (
    <Button
      variant="ghost"
      size="iconMedium"
      aria-label="Swap foreground and background colors"
      onClick={() => dispatch({ type: 'SWAP_COLORS' })}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children ?? <ArrowsDownUpIcon weight="bold" />}
    </Button>
  )
}
