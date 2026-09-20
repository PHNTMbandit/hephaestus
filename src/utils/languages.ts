import { m } from '@/paraglide/messages'

const messageMap = m as unknown as Record<string, () => string>

export const languages = [
  { value: 'en', label: messageMap['common.languages.en']() },
  { value: 'ja', label: messageMap['common.languages.ja']() },
]
