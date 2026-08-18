import { ConformanceLevel } from './conformance-level'
import { ContrastApcaFont } from './contrast-apca-font'
import { ContrastApcaFontControls } from './contrast-apca-font-controls'
import { ContrastCheckerRoot } from './contrast-checker-root'
import { ContrastColorInputs } from './contrast-color-inputs'
import { ContrastColorPicker } from './contrast-color-picker'
import { ContrastMethod } from './contrast-method'
import { ContrastPanel } from './contrast-panel'
import { ContrastPanelContent } from './contrast-panel-content'
import { ContrastRequirements } from './contrast-requirements'
import { ContrastScore } from './contrast-score'
import { ContrastSummary } from './contrast-summary'
import { ContrastSwap } from './contrast-swap'

export const ContrastChecker = {
  Root: ContrastCheckerRoot,
  Panel: ContrastPanel,
  PanelContent: ContrastPanelContent,
  Method: ContrastMethod,
  ColorInputs: ContrastColorInputs,
  ColorPicker: ContrastColorPicker,
  Swap: ContrastSwap,
  Summary: ContrastSummary,
  Score: ContrastScore,
  Level: ConformanceLevel,
  Requirements: ContrastRequirements,
  ApcaFontControls: ContrastApcaFontControls,
  ApcaFont: ContrastApcaFont,
}
