import Path from './Path.js';
import FileSystem from './FileSystem.js';
import { Locale } from '../Locales/Locale.js';
import { LocaleKeys } from '../Constants/LocaleKeys.js';

export function coerceDirectory(locale: Locale, strictCheck: boolean, arg: string): string | void {
    const absPath = Path.resolve(arg);
    if (FileSystem.existsSync(absPath)) {
        if (FileSystem.statSync(absPath).isDirectory()) {
            return absPath;
        }
        throw new Error(locale.get(LocaleKeys.DIR_DOESNT_EXIST, [arg]));
    }
    if (strictCheck) {
        throw new Error(locale.get(LocaleKeys.DIR_DOESNT_EXIST, [arg]));
    } else {
        return FileSystem.createFolderStructure(absPath);
    }
}