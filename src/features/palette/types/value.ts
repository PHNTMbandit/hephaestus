export type ValueType = {
  value: string
  label: string
  displayColor: (color: string) => string
  getColorClipboardFormat: (color: string) => string
}
