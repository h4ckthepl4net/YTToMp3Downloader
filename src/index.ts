import fs from 'fs';
import path from 'path';

//import { Puppeteer } from 'puppeteer';
import { osLocaleSync } from 'os-locale';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { SimpleArrayOption } from './Types/Options/Arrays/SimpleArrayOption.js';
import { Locale } from './Locales/Locale.js';


// Getting system locale
const sys_locale: string = osLocaleSync().replace('-', '_');

// Creating locale object for application to get localized text
const app_i18n: Locale = new Locale(sys_locale);

const argv = yargs(hideBin(process.argv))
    .locale(sys_locale)
    .option('tracks', new SimpleArrayOption('t', 'Track names to download'))
    .option('trackDir', {
        alias: 'd',
        type: 'string',
        description: 'Directory to download tracks by reading names from files in this directory',
        normalize: true,
        coerce: (arg: string): string => { // TODO move to helpers file
            const absPath = path.resolve(arg);
            if (fs.existsSync(absPath)) {
                if (fs.statSync(absPath).isDirectory()) {
                    return absPath;
                }
                throw new Error(`Mentioned location is not a directory: ${arg}`);
            }
            throw new Error(`Cannot resolve mentioned output directory: ${arg}`);
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
                throw new Error(`Mentioned location is not a directory: ${arg}`);
            }
            throw new Error(`Cannot resolve mentioned output directory: ${arg}`);
        }
    })
    .argv;

console.log(argv);

//const puppeteer = new Puppeteer({ headless: true });
