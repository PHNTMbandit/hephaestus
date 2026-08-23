import { CheckCircleIcon } from '@phosphor-icons/react'
import { cn } from 'dawn-ui-react'
import { ColorValueRow } from '#/features/color/components/color-value-row'
import { getForeground } from '#/features/color/utils/style'

type ContrastCombinationCardProps = React.ComponentProps<'button'> & {
  foreground: string
  background: string
  selected?: boolean
  formatValue?: (color: string) => string
}

// A selectable foreground-on-background pairing preview with both colour values.
export const ContrastCombinationCard = ({
  foreground,
  background,
  selected = false,
  formatValue = (color) => color,
  className,
  ref,
  ...props
}: ContrastCombinationCardProps) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-lg border border-border transition-colors hover:cursor-pointer',
        className,
      )}
      ref={ref}
      {...props}
    >
      {selected && (
        <CheckCircleIcon
          weight="fill"
          className="absolute top-2xs left-2xs size-md"
          style={{ color: getForeground(background) }}
        />
      )}
      <div
        className="flex grow items-center justify-center p-md"
        style={{ backgroundColor: background }}
      >
        <span className="style-text-strong-2" style={{ color: foreground }}>
          Aa
        </span>
      </div>
      <div className="flex flex-col gap-3xs bg-surface-background px-xs py-2xs">
        <ColorValueRow color={foreground} label={formatValue(foreground)} />
        <ColorValueRow color={background} label={formatValue(background)} />
      </div>
    </button>
  )
}
