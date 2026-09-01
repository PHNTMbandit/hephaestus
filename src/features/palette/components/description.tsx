import { cn } from 'dawn-ui-react'

type PaletteDescriptionProps = React.ComponentProps<'p'>

export const PaletteDescription = ({
  className,
  children,
  ref,
  ...props
}: PaletteDescriptionProps) => {
  return (
    <p className={cn('text-on-surface-variant', className)} ref={ref} {...props}>
      {children}
    </p>
  )
}
