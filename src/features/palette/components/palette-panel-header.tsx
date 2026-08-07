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
        'flex w-full items-center justify-between border-b border-border pt-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
