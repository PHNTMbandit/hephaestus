import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react'
import { eq, useDbClient, useLiveQuery } from '@tanstack/react-db'
import { useParams } from '@tanstack/react-router'
import { Button, cn } from 'dawn-ui-react'
import { paletteCollection } from '#/features/palette/db/collection'
import { usePalette } from '#/features/palette/hooks/use-palette'

type PaletteEditorResetProps = React.ComponentProps<'button'>

export const PaletteEditorReset = ({
  className,
  children,
  ref,
  ...props
}: PaletteEditorResetProps) => {
  const { dispatch } = usePalette()
  const collection = useDbClient().collection(paletteCollection)
  const { paletteId } = useParams({ from: '/_secure/palette-generator/{-$paletteId}' })
  const { data } = useLiveQuery((q) =>
    q
      .from({ palette: collection })
      .where(({ palette }) => eq(palette.id, paletteId))
      .select(({ palette }) => ({
        colors: palette.colors,
        baseColor: palette.baseColor,
      }))
      .findOne(),
  )

  if (!data) {
    return null
  }

  const handleClick = () => {
    dispatch({
      type: 'RESET',
      payload: { colors: data.colors, baseColor: data.baseColor },
    })
  }

  return (
    <Button
      tone="neutral"
      variant={'ghost'}
      className={cn('shrink-0', className)}
      ref={ref}
      {...props}
      onClick={handleClick}
    >
      <ArrowCounterClockwiseIcon weight="bold" />
      Reset
      {children}
    </Button>
  )
}
