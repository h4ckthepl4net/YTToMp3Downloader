//import { Puppeteer } from 'puppeteer';
import { osLocaleSync } from 'os-locale';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { SimpleArrayOption } from './Types/Options/SimpleArrayOption.js';
import { DirectoryOption } from './Types/Options/DirectoryOption.js';
import { Locale } from './Locales/Locale.js';
import { LocaleKeys } from './Constants/LocaleKeys.js';


// Getting system locale
const sys_locale: string = osLocaleSync().replace('-', '_');

// Creating locale object for application to get localized text
const app_i18n: Locale = new Locale(sys_locale);

const argv = yargs(hideBin(process.argv))
    .locale(sys_locale)
    .option('tracks', new SimpleArrayOption('t', app_i18n.get(LocaleKeys.TRACKS_DESC)))
    .option('trackDir', new DirectoryOption('d', app_i18n.get(LocaleKeys.TRACK_DIR_DESC), app_i18n))
    .option('out', new DirectoryOption('o', app_i18n.get(LocaleKeys.OUT_DIR_DESC), app_i18n, './music', true, false))
    .argv;

console.log(argv);

//const puppeteer = new Puppeteer({ headless: true });
