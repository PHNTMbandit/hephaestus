import { cn } from 'dawn-ui-react'

type ColorValueRowProps = React.ComponentProps<'div'> & {
  color: string
  label?: React.ReactNode
}

export const ColorValueRow = ({ color, label, className, ref, ...props }: ColorValueRowProps) => {
  return (
    <div className={cn('flex items-center gap-2xs', className)} ref={ref} {...props}>
      <span
        className="size-sm shrink-0 rounded-md border border-border"
        style={{ backgroundColor: color }}
      />
      <span className="truncate style-text-default--1 text-on-surface-variant tabular-nums">
        {label ?? color}
      </span>
    </div>
  )
}
