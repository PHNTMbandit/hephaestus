import { createFileRoute } from '@tanstack/react-router'
import { Separator } from 'dawn-ui-react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { getContrastAlgorithm } from '#/features/accessibility/algorithms'
import { ContrastChecker } from '#/features/accessibility/contrast-checker/components/contrast-checker'

export const Route = createFileRoute('/_secure/contrast-checker')({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      foreground: (search.foreground as string) ?? '#e11d48',
      background: (search.background as string) ?? '#ffffff',
    }
  },
})

function RouteComponent() {
  const { foreground, background } = Route.useSearch()

  return (
    <ContrastChecker.Root
      initialState={{
        foregroundColor: foreground,
        backgroundColor: background,
        foregroundPalette: [],
        backgroundPalette: [],
        contrastMethod: 'WCAG2',
        contrastScore: getContrastAlgorithm('WCAG2').calculate(foreground, background),
        fontSize: 16,
        fontWeight: 400,
      }}
    >
      <div className="flex size-full flex-col overflow-auto lg:flex-row lg:overflow-hidden">
        <ContrastChecker.Panel>
          <CurrentPageTitle />
          <ContrastChecker.PanelContent>
            <ContrastChecker.Method />
            <ContrastChecker.ColorInputs />
            <ContrastChecker.ApcaFontControls />
          </ContrastChecker.PanelContent>
        </ContrastChecker.Panel>
        <div className="flex w-full min-w-0 flex-col gap-md overflow-auto p-lg">
          <ContrastChecker.Summary />
          <Separator />
          <ContrastChecker.ApcaMatrix />
          <ContrastChecker.ApcaFont />
          <ContrastChecker.Requirements />
        </div>
      </div>
    </ContrastChecker.Root>
  )
}
