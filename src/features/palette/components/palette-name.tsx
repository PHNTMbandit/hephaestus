import { cn } from 'dawn-ui-react'

type PaletteNameProps = React.ComponentProps<'span'>

export const PaletteName = ({ className, children, ref, ...props }: PaletteNameProps) => {
  return (
    <span className={cn('style-text-default-0', className)} ref={ref} {...props}>
      {children}
    </span>
  )
}
