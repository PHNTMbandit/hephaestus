import { TrashIcon } from '@phosphor-icons/react'
import { useDbClient } from '@tanstack/react-db'
import { cn, MenuItem } from 'dawn-ui-react'
import { paletteCollection } from '../db/palette-collection'
import { usePalette } from '../hooks/use-palette'

type PaletteMenuDeleteProps = React.ComponentProps<typeof MenuItem>

export const PaletteMenuDelete = ({
  className,
  children,
  ref,
  ...props
}: PaletteMenuDeleteProps) => {
  const { state } = usePalette()
  const collection = useDbClient().collection(paletteCollection)

  const handleClick = () => {
    if (!state.id) return
    return collection.delete(state.id)
  }

  return (
    <MenuItem tone="error" className={cn('', className)} ref={ref} onClick={handleClick} {...props}>
      <TrashIcon weight="bold" />
      Delete
      {children}
    </MenuItem>
  )
}
