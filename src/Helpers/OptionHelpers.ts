import Path from './Path.js';
import FileSystem from './FileSystem.js';
import { Locale } from '../Locales/Locale.js';
import { LocaleKeys } from '../Constants/LocaleKeys.js';

export function coerceDirectory(locale: Locale, strictCheck: boolean, defaultPath: string | undefined, arg: string): string | undefined | void {
    if (!arg) {
        if (defaultPath) {
            arg = defaultPath;
        } else {
            return undefined;
        }
    }
    const absPath = Path.resolve(arg);
    if (FileSystem.existsSync(absPath)) {
        const stats = FileSystem.statSync(absPath);
        if (!stats) {
            throw new Error(locale.get(LocaleKeys.NO_FILE_STATS, [arg]));
        }
        if (stats.isDirectory()) {
            return absPath;
        }
        throw new Error(locale.get(LocaleKeys.LOCATION_IS_NOT_DIR, [arg]));
    }
    if (strictCheck) {
        throw new Error(locale.get(LocaleKeys.OUT_DIR_DOESNT_EXIST, [arg]));
    } else {
        FileSystem.mkdirSync(absPath, { recursive: true })
        return absPath;
    }
}

export function coerceFile(locale: Locale, strictCheck: boolean, defaultPath: string | undefined, arg: string): string | undefined | void {
    if (!arg) {
        if (defaultPath) {
            arg = defaultPath;
        } else {
            return undefined;
        }
    }
    const absPath = Path.resolve(arg);
    if (FileSystem.existsSync(absPath)) {
        const stats = FileSystem.statSync(absPath);
        if (!stats) {
            throw new Error(locale.get(LocaleKeys.NO_FILE_STATS, [arg]));
        }
        if (!stats.isDirectory()) {
            return absPath;
        }
        throw new Error(locale.get(LocaleKeys.LOCATION_IS_DIR, [arg]));
    }
    if (strictCheck) {
        throw new Error(locale.get(LocaleKeys.FILE_DOESNT_EXIST, [arg]));
    } else {
        return FileSystem.createFileRecursively(absPath);
    }
}