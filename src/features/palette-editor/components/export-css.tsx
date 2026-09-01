import { FileCssIcon } from '@phosphor-icons/react/dist/ssr'
import { useSuspenseQueries } from '@tanstack/react-query'
import {
  Button,
  cn,
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopy,
  CodeBlockDownload,
  CodeBlockHeader,
  CodeBlockName,
  CodeBlockSelect,
  CodeBlockWindow,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsTab,
  TabsList,
  type CodeBlockValue,
  TabsPanel,
  TabsIndicator,
} from 'dawn-ui-react'
import { usePalette } from '#/features/palette/hooks/use-palette'
import { valueTypes } from '#/features/palette/utils'
import {
  codeToHtmlQueryOptions,
  convertColorsToCss,
  convertColorsToScss,
} from '#/utils/code-to-html.ts'

import type { ValueType } from '#/features/palette/types/value'

type PaletteExportCssProps = React.ComponentProps<'button'>

export const PaletteExportCss = ({ className, children, ref, ...props }: PaletteExportCssProps) => {
  const { state } = usePalette()

  const formattedCss = Object.keys(valueTypes).map((key) =>
    convertColorsToCss(state.colors, valueTypes[key as keyof typeof valueTypes] as ValueType),
  )
  const formattedScss = Object.keys(valueTypes).map((key) =>
    convertColorsToScss(state.colors, valueTypes[key as keyof typeof valueTypes] as ValueType),
  )
  const cssQueries = useSuspenseQueries({
    queries: formattedCss.map((css) => codeToHtmlQueryOptions(css, 'css')),
  })
  const scssQueries = useSuspenseQueries({
    queries: formattedScss.map((scss) => codeToHtmlQueryOptions(scss, 'scss')),
  })

  const cssItems: CodeBlockValue[] = Object.keys(valueTypes).map((key, index) => ({
    id: String(index),
    name: 'palette.css',
    label: key.toUpperCase(),
    content: cssQueries[index].data,
  }))

  const scssItems: CodeBlockValue[] = Object.keys(valueTypes).map((key, index) => ({
    id: String(index),
    name: 'palette.scss',
    label: key.toUpperCase(),
    content: scssQueries[index].data,
  }))

  return (
    <Dialog>
      <DialogTrigger>
        <Button tone="neutral" className={cn('w-full', className)} ref={ref} {...props}>
          <FileCssIcon weight="bold" />
          CSS
        </Button>
      </DialogTrigger>
      <DialogPopup className={'w-1/3'}>
        <DialogHeader>
          <DialogTitle>
            <FileCssIcon weight="bold" />
            CSS
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          {children}
          <Tabs size="small" fill>
            <TabsList>
              <TabsTab value="css">CSS</TabsTab>
              <TabsTab value="scss">SCSS</TabsTab>
              <TabsIndicator />
            </TabsList>
            <TabsPanel value="css">
              <CodeBlock items={cssItems} defaultValue={cssItems[0]} className={'w-full'}>
                <CodeBlockHeader>
                  <CodeBlockName />
                  <CodeBlockSelect />
                </CodeBlockHeader>
                <CodeBlockWindow>
                  <CodeBlockActions>
                    <CodeBlockDownload />
                    <CodeBlockCopy />
                  </CodeBlockActions>
                </CodeBlockWindow>
              </CodeBlock>
            </TabsPanel>
            <TabsPanel value="scss">
              <CodeBlock items={scssItems} defaultValue={scssItems[0]} className={'w-full'}>
                <CodeBlockHeader>
                  <CodeBlockName />
                  <CodeBlockSelect />
                </CodeBlockHeader>
                <CodeBlockWindow>
                  <CodeBlockActions>
                    <CodeBlockDownload />
                    <CodeBlockCopy />
                  </CodeBlockActions>
                </CodeBlockWindow>
              </CodeBlock>
            </TabsPanel>
          </Tabs>
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}
