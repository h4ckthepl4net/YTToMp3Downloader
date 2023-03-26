export type ParsedLocale = {
    [key: string]: string,
}

export type LocaleFileReadResult = {
    parsed: ParsedLocale,
    json: string,
}