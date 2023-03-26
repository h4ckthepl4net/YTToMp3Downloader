import fs from 'fs';
import path from 'path';

//import { Puppeteer } from 'puppeteer';
import { osLocaleSync } from 'os-locale';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { SimpleArrayOption } from './Types/Options/SimpleArrayOption.js';
import { Locale } from './Locales/Locale.js';
import { LocaleKeys } from './Constants/LocaleKeys.js';


// Getting system locale
const sys_locale: string = osLocaleSync().replace('-', '_');

// Creating locale object for application to get localized text
const app_i18n: Locale = new Locale(sys_locale);

const argv = yargs(hideBin(process.argv))
    .locale(sys_locale)
    .option('tracks', new SimpleArrayOption('t', app_i18n.get(LocaleKeys.TRACKS_DESC)))
    .option('trackDir', {
        alias: 'd',
        type: 'string',
        description: app_i18n.get(LocaleKeys.TRACK_DIR_DESC),
        normalize: true,
        coerce: (arg: string): string => { // TODO move to helpers file
            const absPath = path.resolve(arg);
            if (fs.existsSync(absPath)) {
                if (fs.statSync(absPath).isDirectory()) {
                    return absPath;
                }
                throw new Error(app_i18n.get(LocaleKeys.LOCATION_IS_NOT_DIR, [arg]));
            }
            throw new Error(app_i18n.get(LocaleKeys.DIR_DOESNT_EXIST, [arg]));
        }
    })
    .option('out', {
        alias: 'o',
        type: 'string',
        description: 'Output directory',
        default: './',
        normalize: true,
        coerce: (arg: string): string => { // TODO move to helpers file
            const absPath = path.resolve(arg);
            if (fs.existsSync(absPath)) {
                if (fs.statSync(absPath).isDirectory()) {
                    return absPath;
                }
                throw new Error(app_i18n.get(LocaleKeys.LOCATION_IS_NOT_DIR, [arg]));
            }
            throw new Error(app_i18n.get(LocaleKeys.DIR_DOESNT_EXIST, [arg]));
        }
    })
    .argv;

console.log(argv);

//const puppeteer = new Puppeteer({ headless: true });
