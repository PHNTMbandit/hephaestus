import { DotsThreeIcon } from '@phosphor-icons/react'
import { Button, cn, Menu, MenuPopup, MenuTrigger } from 'dawn-ui-react'

type PaletteMenuProps = React.ComponentProps<'button'>

export const PaletteMenu = ({ className, children, ref, ...props }: PaletteMenuProps) => {
  return (
    <Menu>
      <MenuTrigger className={cn('', className)} ref={ref} {...props}>
        <Button variant={'ghost'} size="iconSmall" tone="neutral">
          <DotsThreeIcon weight="bold" />
        </Button>
      </MenuTrigger>
      <MenuPopup side="bottom" align="end">
        {children}
      </MenuPopup>
    </Menu>
  )
}
