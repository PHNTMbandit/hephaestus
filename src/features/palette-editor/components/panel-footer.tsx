import { cn } from 'dawn-ui-react'

type PalettePanelFooterProps = React.ComponentProps<'div'>

export const PalettePanelFooter = ({
  className,
  children,
  ref,
  ...props
}: PalettePanelFooterProps) => {
  return (
    <div
      className={cn('w-full border-t border-border px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
