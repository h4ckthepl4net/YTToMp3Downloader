import Path from '../Helpers/Path.js';
import FileSystem from '../Helpers/FileSystem.js';
import JSON from '../Helpers/JSON.js';
import { ParsedLocale, LocaleFileReadResult } from '../Types/TypeDefs/LocaleTypeDefs.js';
import { LocaleKeys } from '../Constants/LocaleKeys.js';

export class Locale {
    private parsed: ParsedLocale;
;

    constructor(locale: string, fallback: string = 'en_US') {
        const result: LocaleFileReadResult = Locale.readLocaleFile(locale, fallback);
        this.parsed = result.parsed;
    }

    public get(key: LocaleKeys, args: Array<any> | null = null): string {
        if (!this.parsed[key]) {
            return key;
        }
        let text = this.parsed[key];
        if (args && args instanceof Array) {
            args.forEach((arg: any, index: number) => {
                text = text.replace(new RegExp(`\\\$\\\{${index+1}\\\}`, 'g'), arg);
            })
        }
        return text;
    }

    private static readLocaleFile(localeFile: string, fallback: string | null = null): LocaleFileReadResult {
        const __dirname = Path.dirnameFromFileUrl(import.meta.url);
        let pathToCheck = Path.resolve(__dirname, `./i18n/${localeFile}.json`);
        if (!FileSystem.existsSync(pathToCheck)) {
            let errorMessage = `Cannot find locale file for locale: ${localeFile}`;
            if (fallback) {
                pathToCheck = Path.resolve(__dirname, `./i18n/${fallback}.json`);
                if (!FileSystem.existsSync(pathToCheck)) {
                    errorMessage += ` or fallback locale file for locale: ${fallback}`;
                    throw new ReferenceError(errorMessage);
                }
            } else {
                throw new ReferenceError(errorMessage);
            }
        }

        const json: string = FileSystem.readFileSync(pathToCheck, 'utf8') as string;
        const parsed: ParsedLocale = JSON.parse(json) as ParsedLocale;

        return {
            json,
            parsed,
        };
    }
}