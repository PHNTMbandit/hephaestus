import { useLiveSuspenseQuery } from '@tanstack/react-db'
import { Link } from '@tanstack/react-router'
import { cn, createAppColumnHelper, TableResults, useAppTable } from 'dawn-ui-react'
import { Color } from '#/features/color/components/color'
import { Palette } from '#/features/palette/components/palette'
import { userPalettes } from '#/features/palette/db/live-queries'
import { type Palette as PaletteType } from '#/features/palette/db/palette-collection'
import { authClient } from '#/lib/auth-client'

type LibraryTableProps = React.ComponentProps<'table'>

export const PaletteEditorLibraryTable = ({
  className,
  children,
  ref,
  ...props
}: LibraryTableProps) => {
  const { data: session } = authClient.useSession()
  const { data } = useLiveSuspenseQuery(userPalettes(session?.user?.id ?? ''))
  const columnHelper = createAppColumnHelper<PaletteType>()
  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ cell }) => {
        const palette = cell.row.original
        return (
          <Link to="/palette-generator/{-$paletteId}" params={{ paletteId: palette.id }}>
            <Palette.Card key={palette.id} palette={palette}>
              <Palette.Swatches orientation="horizontal">
                {({ color }) => (
                  <Color.Provider color={color}>
                    <Color.Swatch />
                  </Color.Provider>
                )}
              </Palette.Swatches>
              <Palette.CardFooter>
                <Palette.Name />
              </Palette.CardFooter>
            </Palette.Card>
          </Link>
        )
      },
    }),
  ])

  const table = useAppTable({
    key: 'palettes',
    columns,
    meta: {
      viewMode: 'grid',
    },
    data: data ?? [],
  })

  return (
    <table.AppTable>
      <table.TableContainer className={cn('', className)} ref={ref} {...props}>
        <table.TableToolbar>
          <table.TableSearch placeholder="Search palettes..." />
        </table.TableToolbar>
        <table.TableViewport>
          <table.TableBody />
        </table.TableViewport>
        <table.TableNav>
          <TableResults>
            {(start, end, total) => (
              <span className="style-text-default--1 text-on-surface-variant">
                Showing {start}–{end} of {total}
              </span>
            )}
          </TableResults>
          <table.TablePagination>
            <table.TableFirstPage />
            <table.TablePreviousPage />
            <table.TablePaging />
            <table.TableNextPage />
            <table.TableLastPage />
          </table.TablePagination>
        </table.TableNav>
        {children}
      </table.TableContainer>
    </table.AppTable>
  )
}
