import { CheckIcon } from '@phosphor-icons/react'
import { cn } from 'dawn-ui-react'
import { getForeground } from '../utils/style'

type ColorSwatchButtonProps = React.ComponentProps<'button'> & {
  color: string
  selected?: boolean
}

export const ColorSwatchButton = ({
  color,
  selected = false,
  className,
  children,
  ref,
  ...props
}: ColorSwatchButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'flex size-lg items-center justify-center rounded-md border border-border transition-colors hover:cursor-pointer',
        selected && 'border-2',
        className,
      )}
      style={{
        backgroundColor: color,
        borderColor: selected ? getForeground(color) : undefined,
        color: getForeground(color),
      }}
      ref={ref}
      {...props}
    >
      {children ?? (selected && <CheckIcon weight="bold" />)}
    </button>
  )
}
