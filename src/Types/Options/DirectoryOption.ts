import { YargOptionType } from '../TypeDefs/OptionsTypeDefs.js';
import { BaseOption } from './BaseOption.js';
import { coerceDirectory } from '../../Helpers/OptionHelpers.js';
import { Locale } from '../../Locales/Locale.js';


export class DirectoryOption extends BaseOption {
    constructor(
        public override alias: string,
        public override description: string,
        app_i18n: Locale,
        public defaultPath?: string, 
        public normalize: boolean = true,
        strictCheck: boolean = true,
        public coerce = coerceDirectory.bind(null, app_i18n, strictCheck, defaultPath)
    ) {
        const type: YargOptionType = 'string';
        super(type, alias, description);
    }

    public get default(): string | undefined {
        return this.defaultPath ?? undefined;
    }
}