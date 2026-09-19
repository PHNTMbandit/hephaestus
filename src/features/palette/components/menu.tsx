import { DotsThreeIcon } from '@phosphor-icons/react'
import { Button, cn, Menu, MenuPopup, MenuTrigger } from 'dawn-ui-react'

type PaletteMenuProps = React.ComponentProps<typeof Button>

export const PaletteMenu = ({ className, children, ref, ...props }: PaletteMenuProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <Button
          variant={'ghost'}

          tone="neutral"
          className={cn('', className)}
          ref={ref}
          {...props}
        >
          <DotsThreeIcon weight="bold" />
        </Button>
      </MenuTrigger>
      <MenuPopup side="bottom" align="end">
        {children}
      </MenuPopup>
    </Menu>
  )
}
