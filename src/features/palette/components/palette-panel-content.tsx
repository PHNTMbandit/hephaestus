import { cn } from 'dawn-ui-react'

type PalettePanelContentProps = React.ComponentProps<'div'>

export const PalettePanelContent = ({
  className,
  children,
  ref,
  ...props
}: PalettePanelContentProps) => {
  return (
    <div
      className={cn('flex w-full grow flex-col items-center justify-start px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
