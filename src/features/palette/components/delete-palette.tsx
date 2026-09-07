import { useDbClient } from '@tanstack/react-db'
import { Button, cn } from 'dawn-ui-react'
import { paletteCollection } from '../db/palette-collection'

type PaletteDeletePaletteProps = React.ComponentProps<typeof Button> & {
  paletteId: string
}

export const PaletteDeletePalette = ({
  paletteId,
  className,
  children,
  ref,
  ...props
}: PaletteDeletePaletteProps) => {
  const collection = useDbClient().collection(paletteCollection)

  return (
    <Button
      tone="error"
      variant="outline"
      className={cn('', className)}
      ref={ref}
      onClick={() => collection.delete(paletteId)}
      {...props}
    >
      {children ?? 'Delete'}
    </Button>
  )
}
