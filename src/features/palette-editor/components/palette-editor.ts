import { PaletteAccessibilityContent } from './accessibility/content'
import { PaletteAccessibilityCopy } from './accessibility/copy'
import { PaletteAccessibilityPreview } from './accessibility/preview'
import { PaletteAccessibilityRecommendation } from './accessibility/recommendation'
import { PaletteAccessibilityRoot } from './accessibility/root'
import { PaletteAccessibilityScores } from './accessibility/scores'
import { PaletteAccessibilitySwatches } from './accessibility/swatches'
import { PaletteAdd } from './add-color'
import { PaletteGeneratorSelect } from './algorithm-select'
import { PaletteBaseColor } from './base-color'
import { PaletteBlocker } from './blocker'
import { PaletteCount } from './color-count'
import { PaletteGeneratorContent } from './controls'
import { PaletteEdit } from './edit-color'
import { PaletteExportRoot } from './export-root'
import { PaletteImport } from './import'
import { PaletteLock } from './lock-color'
import { PaletteModeToggle } from './mode-toggle'
import { PaletteModeView } from './mode-view'
import { PalettePanel } from './panel'
import { PalettePanelContent } from './panel-content'
import { PalettePanelFooter } from './panel-footer'
import { PalettePanelHeader } from './panel-header'
import { PalettePanelTabs } from './panel-tabs'
import { PaletteProjectSelect } from './project-select'
import { PaletteRedo } from './redo'
import { PaletteRemoveColor } from './remove-color'
import { PaletteReorderableList } from './reorderable-colors'
import { PaletteReset } from './reset'
import { PaletteSave } from './save'
import { PaletteSaveForm } from './save-form'
import { PaletteToolbar } from './toolbar'
import { PaletteToolbarGroup } from './toolbar-group'
import { PaletteUndo } from './undo'
import { PaletteUpdate } from './update'
import { PaletteValueSelect } from './value-select'

export const PaletteEditor = {
  AddColor: PaletteAdd,
  RemoveColor: PaletteRemoveColor,
  EditColor: PaletteEdit,
  LockColor: PaletteLock,
  Undo: PaletteUndo,
  Redo: PaletteRedo,
  Reset: PaletteReset,
  BaseColor: PaletteBaseColor,
  AlgorithmSelect: PaletteGeneratorSelect,
  Controls: PaletteGeneratorContent,
  ColorCount: PaletteCount,
  ValueSelect: PaletteValueSelect,
  ModeToggle: PaletteModeToggle,
  ModeView: PaletteModeView,
  ReorderableColors: PaletteReorderableList,
  Save: PaletteSave,
  SaveForm: PaletteSaveForm,
  Update: PaletteUpdate,
  Import: PaletteImport,
  Export: PaletteExportRoot,
  ProjectSelect: PaletteProjectSelect,
  Blocker: PaletteBlocker,
  Panel: PalettePanel,
  PanelHeader: PalettePanelHeader,
  PanelContent: PalettePanelContent,
  PanelFooter: PalettePanelFooter,
  PanelTabs: PalettePanelTabs,
  Toolbar: PaletteToolbar,
  ToolbarGroup: PaletteToolbarGroup,
  AccessibilityRoot: PaletteAccessibilityRoot,
  AccessibilityContent: PaletteAccessibilityContent,
  AccessibilityPreview: PaletteAccessibilityPreview,
  AccessibilitySwatches: PaletteAccessibilitySwatches,
  AccessibilityScores: PaletteAccessibilityScores,
  AccessibilityCopy: PaletteAccessibilityCopy,
  AccessibilityRecommendation: PaletteAccessibilityRecommendation,
}
