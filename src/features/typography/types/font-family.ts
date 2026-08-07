export type WebFont = {
  family: string
  variants: string[]
  subsets: string[]
  version: `v${number}`
  lastModified: `${number}-${number}-${number}`
  files: Record<string, string>
  category: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting'
  kind: 'webfonts#webfont'
  menu: string
}
