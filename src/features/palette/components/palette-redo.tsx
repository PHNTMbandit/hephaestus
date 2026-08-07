import { ArrowUUpRightIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'

type PaletteRedoProps = React.ComponentProps<'button'>

export const PaletteRedo = ({ className, children, ref, ...props }: PaletteRedoProps) => {
  return (
    <Button
      size="iconMedium"
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
    >
      <ArrowUUpRightIcon weight="bold" />
      {children}
    </Button>
  )
}
