export const formatDate = (
  date: Date,
  locale: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return new Intl.DateTimeFormat(locale, options).format(date)
}
