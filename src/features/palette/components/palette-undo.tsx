import { ArrowUUpLeftIcon } from '@phosphor-icons/react'
import { Button, cn } from 'dawn-ui-react'

type PaletteUndoProps = React.ComponentProps<'button'>

export const PaletteUndo = ({ className, children, ref, ...props }: PaletteUndoProps) => {
  return (
    <Button
      size="iconMedium"
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
    >
      <ArrowUUpLeftIcon weight="bold" />
      {children}
    </Button>
  )
}
