import { PaletteEditorAccessibilityContent } from './accessibility/content'
import { PaletteEditorAccessibilityCopy } from './accessibility/copy'
import { PaletteEditorAccessibilityPreview } from './accessibility/preview'
import { PaletteEditorAccessibilityRecommendation } from './accessibility/recommendation'
import { PaletteEditorAccessibilityRoot } from './accessibility/root'
import { PaletteEditorAccessibilityScores } from './accessibility/scores'
import { PaletteEditorAccessibilitySwatches } from './accessibility/swatches'
import { PaletteEditorAddColor } from './add-color'
import { PaletteEditorBlocker } from './blocker'
import { PaletteEditorColorShades } from './color-shades'
import { PaletteEditorControlsAlgorithmSelect } from './controls/algorithm-select'
import { PaletteEditorControlsBaseColor } from './controls/base-color'
import { PaletteEditorControlsColorCount } from './controls/color-count'
import { PaletteEditorControlsContent } from './controls/content'
import { PaletteEditorEditColor } from './edit-color'
import { PaletteEditorExportRoot } from './export-root'
import { PaletteEditorImport } from './import'
import { PaletteEditorLibrarySidebar } from './library-sidebar'
import { PaletteEditorLibraryTable } from './library-table'
import { PaletteEditorLockColor } from './lock-color'
import { PaletteEditorPanel } from './panel'
import { PaletteEditorPanelContent } from './panel-content'
import { PaletteEditorPanelFooter } from './panel-footer'
import { PaletteEditorPanelHeader } from './panel-header'
import { PaletteEditorPanelTabs } from './panel-tabs'
import { PaletteEditorPreviewContent } from './preview/content'
import { PaletteEditorPreviewRenderToggle } from './preview/render-toggle'
import { PaletteEditorProjectSelect } from './project-select'
import { PaletteEditorPublish } from './publish'
import { PaletteEditorPublishForm } from './publish-form'
import { PaletteEditorRedo } from './redo'
import { PaletteEditorRemoveColor } from './remove-color'
import { PaletteEditorRenderMode } from './render-mode'
import { PaletteEditorReorderableColors } from './reorderable-colors'
import { PaletteEditorReset } from './reset'
import { PaletteEditorToolbar } from './toolbar'
import { PaletteEditorToolbarGroup } from './toolbar-group'
import { PaletteEditorUndo } from './undo'
import { PaletteEditorUpdate } from './update'
import { PaletteEditorValueSelect } from './value-select'

export const PaletteEditor = {
  AccessibilityContent: PaletteEditorAccessibilityContent,
  AccessibilityCopy: PaletteEditorAccessibilityCopy,
  AccessibilityPreview: PaletteEditorAccessibilityPreview,
  AccessibilityRecommendation: PaletteEditorAccessibilityRecommendation,
  AccessibilityRoot: PaletteEditorAccessibilityRoot,
  AccessibilityScores: PaletteEditorAccessibilityScores,
  AccessibilitySwatches: PaletteEditorAccessibilitySwatches,
  AddColor: PaletteEditorAddColor,
  ControlsAlgorithmSelect: PaletteEditorControlsAlgorithmSelect,
  ControlsBaseColor: PaletteEditorControlsBaseColor,
  Blocker: PaletteEditorBlocker,
  ControlsColorCount: PaletteEditorControlsColorCount,
  ControlsContent: PaletteEditorControlsContent,
  EditColor: PaletteEditorEditColor,
  Export: PaletteEditorExportRoot,
  Import: PaletteEditorImport,
  LibrarySidebar: PaletteEditorLibrarySidebar,
  LibraryTable: PaletteEditorLibraryTable,
  LockColor: PaletteEditorLockColor,
  Panel: PaletteEditorPanel,
  PanelContent: PaletteEditorPanelContent,
  PanelFooter: PaletteEditorPanelFooter,
  PanelHeader: PaletteEditorPanelHeader,
  PanelTabs: PaletteEditorPanelTabs,
  PreviewContent: PaletteEditorPreviewContent,
  PreviewRenderToggle: PaletteEditorPreviewRenderToggle,
  ProjectSelect: PaletteEditorProjectSelect,
  Redo: PaletteEditorRedo,
  RemoveColor: PaletteEditorRemoveColor,
  RenderMode: PaletteEditorRenderMode,
  ReorderableColors: PaletteEditorReorderableColors,
  Reset: PaletteEditorReset,
  Publish: PaletteEditorPublish,
  PublishForm: PaletteEditorPublishForm,
  Shades: PaletteEditorColorShades,
  Toolbar: PaletteEditorToolbar,
  ToolbarGroup: PaletteEditorToolbarGroup,
  Undo: PaletteEditorUndo,
  Update: PaletteEditorUpdate,
  ValueSelect: PaletteEditorValueSelect,
}
