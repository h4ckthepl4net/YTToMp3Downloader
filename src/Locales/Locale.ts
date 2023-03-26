import FileSystem from '../Helpers/FileSystem.js';
import JSON from '../Helpers/JSON.js';
import { ParsedLocale, LocaleFileReadResult } from '../Types/TypeDefs/LocaleTypeDefs.js';

export class Locale {
    private parsed: ParsedLocale;
;

    constructor(locale: string, fallback: string = 'en_US') {
        const result: LocaleFileReadResult = Locale.readLocaleFile(locale, fallback);
        this.parsed = result.parsed;
    }

    public get(key: string): string {
        return this.parsed[key];
    }

    private static readLocaleFile(localeFile: string, fallback: string | null = null): LocaleFileReadResult {
        let path = `./i18n/${localeFile}.json`;
        if (!FileSystem.existsSync(path)) {
            let errorMessage = `Cannot find locale file for locale: ${localeFile}`;
            if (fallback) {
                path = `./i18n/${fallback}.json`;
                if (!FileSystem.existsSync(path)) {
                    errorMessage += ` or fallback locale file for locale: ${fallback}`;
                    throw new ReferenceError(errorMessage);
                }
            } else {
                throw new ReferenceError(errorMessage);
            }
        }

        const json: string = FileSystem.readFileSync(path, 'utf8') as string;
        const parsed: ParsedLocale = JSON.parse(json) as ParsedLocale;

        return {
            json,
            parsed,
        };
    }
}