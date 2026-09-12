import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { cn, createAppColumnHelper, useAppTable } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { palettesByUserId } from '#/features/palette/db/live-queries'
import { type Palette as PaletteType } from '#/features/palette/db/palette-collection'
import { currentUserQueryOptions } from '#/utils/auth-func'

type LibraryTableProps = React.ComponentProps<'table'>

export const PaletteEditorLibraryTable = ({
  className,
  children,
  ref,
  ...props
}: LibraryTableProps) => {
  const { data: user } = useSuspenseQuery(currentUserQueryOptions)
  const { data } = useLiveSuspenseQuery(palettesByUserId(user?.id ?? ''))
  const columnHelper = createAppColumnHelper<PaletteType>()
  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ cell, table }) => {
        const palette = cell.row.original
        const isGrid = table.atoms.viewMode.get() === 'grid'

        if (!isGrid) {
          return null
        }

        return (
          <Link to="/palette-generator/{-$paletteId}" params={{ paletteId: palette.id }}>
            <Palette.Card key={palette.id} palette={palette}>
              <Palette.Name />
              <Palette.Swatches orientation="horizontal">
                {({ color }) => (
                  <Color.Provider color={color}>
                    <Color.Swatch />
                  </Color.Provider>
                )}
              </Palette.Swatches>
            </Palette.Card>
          </Link>
        )
      },
    }),
  ])

  const table = useAppTable({
    key: 'palettes',
    columns,
    state: {
      viewMode: 'grid',
    },
    data: data ?? [],
  })

  return (
    <table.AppTable>
      <table.TableContainer className={cn('w-full p-px', className)} ref={ref} {...props}>
        <table.TableToolbar>
          <table.TableSearch placeholder="Search palettes..." />
        </table.TableToolbar>
        <table.TableViewport>
          <table.TableBody />
        </table.TableViewport>
        <table.TableNav>
          <table.TablePagination>
            <table.TableFirstPage />
            <table.TablePreviousPage />
            <table.TableNextPage />
            <table.TableLastPage />
          </table.TablePagination>
        </table.TableNav>
        {children}
      </table.TableContainer>
    </table.AppTable>
  )
}
