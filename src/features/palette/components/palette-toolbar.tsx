import { cn } from 'dawn-ui-react'

type PaletteToolbarProps = React.ComponentProps<'div'>

export const PaletteToolbar = ({ className, children, ref, ...props }: PaletteToolbarProps) => {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-3xs rounded-full p-sm xl:absolute xl:top-md xl:left-1/2 xl:z-50 xl:h-2xl xl:-translate-x-1/2 xl:flex-nowrap xl:items-center xl:justify-between xl:gap-sm xl:bg-surface xl:px-2xs xl:py-sm xl:shadow-lg',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
