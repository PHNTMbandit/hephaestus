import { createFileRoute } from '@tanstack/react-router'
import { Separator } from 'dawn-ui-react'
import { CurrentPageTitle } from '#/components/current-page-title'
import { ContrastChecker } from '#/features/contrast-checker/components/contrast-checker'

export const Route = createFileRoute('/_secure/contrast-checker')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContrastChecker.Root
      initialState={{
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        contrastMethod: 'WCAG2',
        contrastScore: 21.0,
        fontSize: 16,
        fontWeight: 400,
      }}
    >
      <div className="flex size-full">
        <ContrastChecker.Panel>
          <CurrentPageTitle />
          <ContrastChecker.PanelContent>
            <ContrastChecker.Method />
            <ContrastChecker.ColorInputs />
            <ContrastChecker.ApcaFontControls />
          </ContrastChecker.PanelContent>
        </ContrastChecker.Panel>
        <div className="flex w-full flex-col gap-md overflow-auto p-lg">
          <ContrastChecker.Summary />
          <Separator />
          <ContrastChecker.ApcaFont />
          <ContrastChecker.Requirements />
        </div>
      </div>
    </ContrastChecker.Root>
  )
}
