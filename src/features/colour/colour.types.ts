export type Colour = {
  id: string
  value: string
  locked: boolean
}

export type ColourContextValue = {
  colour: Colour
}

export type ColourNameList =
  | 'basic'
  | 'bestOf'
  | 'chineseTraditional'
  | 'default'
  | 'french'
  | 'german'
  | 'hindi'
  | 'html'
  | 'japaneseTraditional'
  | 'leCorbusier'
  | 'mlmc_chinese'
  | 'mlmc_dutch'
  | 'mlmc_english'
  | 'mlmc_finnish'
  | 'mlmc_french'
  | 'mlmc_german'
  | 'mlmc_korean'
  | 'mlmc_persian'
  | 'mlmc_polish'
  | 'mlmc_portuguese'
  | 'mlmc_romanian'
  | 'mlmc_russian'
  | 'mlmc_spanish'
  | 'mlmc_swedish'
  | 'nbsIscc'
  | 'ntc'
  | 'osxcrayons'
  | 'ral'
  | 'ridgway'
  | 'risograph'
  | 'sanzoWadaI'
  | 'short'
  | 'spanish'
  | 'thesaurus'
  | 'werner'
  | 'wikipedia'
  | 'windows'
  | 'x11'
  | 'xkcd'
