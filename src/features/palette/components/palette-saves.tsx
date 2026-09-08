import { HeartIcon } from '@phosphor-icons/react'
import { useDbClient, useLiveSuspenseQuery } from '@tanstack/react-db'
import { cn, Toggle } from 'dawn-ui-react'
import { authClient } from '#/lib/auth-client'
import { paletteSaveCount, userPaletteSave } from '../db/live-queries'
import { paletteSavesCollection } from '../db/saves-collection'
import { usePalette } from '../hooks/use-palette'

type PaletteSavesProps = React.ComponentProps<typeof Toggle>

export const PaletteSaves = ({ className, ref, ...props }: PaletteSavesProps) => {
  const collection = useDbClient().collection(paletteSavesCollection)
  const { state } = usePalette()
  const { data: session } = authClient.useSession()

  const userId = session?.user.id
  const paletteId = state.id
  const disabled = !paletteId || !userId

  const { data: allSaves } = useLiveSuspenseQuery(paletteSaveCount(paletteId ?? ''))
  const { data: saveRows } = useLiveSuspenseQuery(userPaletteSave(paletteId ?? '', userId ?? ''))
  const isSaved = saveRows?.[0]

  const handleChange = (pressed: boolean) => {
    if (!paletteId || !userId) return
    if (pressed) {
      collection.insert({ id: crypto.randomUUID(), colorPaletteId: paletteId, userId })
    } else if (isSaved) {
      collection.delete(isSaved.id)
    }
  }

  return (
    <Toggle
      disabled={disabled}
      pressed={!!isSaved}
      onPressedChange={handleChange}
      className={cn('ml-auto', className)}
      ref={ref}
      {...props}
    >
      {({ pressed }) => (
        <>
          <HeartIcon weight={pressed ? 'fill' : 'bold'} />
          <span className="style-text-default--1">{allSaves?.length ?? 0}</span>
        </>
      )}
    </Toggle>
  )
}
