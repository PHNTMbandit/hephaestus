export type ValueType = {
  value: string
  label: string
  displayColor: (colour: string) => string
  getColorClipboardFormat: (colour: string) => string
}
