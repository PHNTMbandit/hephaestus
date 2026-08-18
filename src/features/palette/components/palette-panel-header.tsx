import { cn } from 'dawn-ui-react'

type PalettePanelHeaderProps = React.ComponentProps<'div'>

export const PalettePanelHeader = ({
  className,
  children,
  ref,
  ...props
}: PalettePanelHeaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-xs border-b border-border',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
