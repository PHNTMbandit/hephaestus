import { PaletteEditorAccessibilityContent } from './accessibility/content'
import { PaletteEditorAccessibilityCopy } from './accessibility/copy'
import { PaletteEditorAccessibilityPreview } from './accessibility/preview'
import { PaletteEditorAccessibilityRecommendation } from './accessibility/recommendation'
import { PaletteEditorAccessibilityRoot } from './accessibility/root'
import { PaletteEditorAccessibilityScores } from './accessibility/scores'
import { PaletteEditorAccessibilitySwatches } from './accessibility/swatches'
import { PaletteEditorAddColor } from './add-color'
import { PaletteEditorAlgorithmSelect } from './algorithm-select'
import { PaletteEditorBaseColor } from './base-color'
import { PaletteEditorBlocker } from './blocker'
import { PaletteEditorColorCount } from './color-count'
import { PaletteEditorColorShades } from './color-shades'
import { PaletteEditorControls } from './controls'
import { PaletteEditorEditColor } from './edit-color'
import { PaletteEditorExportRoot } from './export-root'
import { PaletteEditorImport } from './import'
import { PaletteEditorLockColor } from './lock-color'
import { PaletteEditorModeToggle } from './mode-toggle'
import { PaletteEditorModeView } from './mode-view'
import { PaletteEditorPanel } from './panel'
import { PaletteEditorPanelContent } from './panel-content'
import { PaletteEditorPanelFooter } from './panel-footer'
import { PaletteEditorPanelHeader } from './panel-header'
import { PaletteEditorPanelTabs } from './panel-tabs'
import { PaletteEditorProjectSelect } from './project-select'
import { PaletteEditorRedo } from './redo'
import { PaletteEditorRemoveColor } from './remove-color'
import { PaletteEditorReorderableColors } from './reorderable-colors'
import { PaletteEditorReset } from './reset'
import { PaletteEditorSave } from './save'
import { PaletteEditorSaveForm } from './save-form'
import { PaletteEditorToolbar } from './toolbar'
import { PaletteEditorToolbarGroup } from './toolbar-group'
import { PaletteEditorUndo } from './undo'
import { PaletteEditorUpdate } from './update'
import { PaletteEditorValueSelect } from './value-select'

export const PaletteEditor = {
  AddColor: PaletteEditorAddColor,
  RemoveColor: PaletteEditorRemoveColor,
  EditColor: PaletteEditorEditColor,
  LockColor: PaletteEditorLockColor,
  Undo: PaletteEditorUndo,
  Redo: PaletteEditorRedo,
  Reset: PaletteEditorReset,
  BaseColor: PaletteEditorBaseColor,
  AlgorithmSelect: PaletteEditorAlgorithmSelect,
  Controls: PaletteEditorControls,
  ColorCount: PaletteEditorColorCount,
  ValueSelect: PaletteEditorValueSelect,
  ModeToggle: PaletteEditorModeToggle,
  ModeView: PaletteEditorModeView,
  ReorderableColors: PaletteEditorReorderableColors,
  Save: PaletteEditorSave,
  SaveForm: PaletteEditorSaveForm,
  Update: PaletteEditorUpdate,
  Import: PaletteEditorImport,
  Export: PaletteEditorExportRoot,
  ProjectSelect: PaletteEditorProjectSelect,
  Blocker: PaletteEditorBlocker,
  Panel: PaletteEditorPanel,
  PanelHeader: PaletteEditorPanelHeader,
  PanelContent: PaletteEditorPanelContent,
  PanelFooter: PaletteEditorPanelFooter,
  PanelTabs: PaletteEditorPanelTabs,
  Shades: PaletteEditorColorShades,
  Toolbar: PaletteEditorToolbar,
  ToolbarGroup: PaletteEditorToolbarGroup,
  AccessibilityRoot: PaletteEditorAccessibilityRoot,
  AccessibilityContent: PaletteEditorAccessibilityContent,
  AccessibilityPreview: PaletteEditorAccessibilityPreview,
  AccessibilitySwatches: PaletteEditorAccessibilitySwatches,
  AccessibilityScores: PaletteEditorAccessibilityScores,
  AccessibilityCopy: PaletteEditorAccessibilityCopy,
  AccessibilityRecommendation: PaletteEditorAccessibilityRecommendation,
}
