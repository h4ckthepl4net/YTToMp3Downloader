import { coerceFile } from "../../Helpers/OptionHelpers.js";
import { Locale } from "../../Locales/Locale.js";
import { YargOptionType } from "../TypeDefs/OptionsTypeDefs.js";
import { BaseOption } from "./BaseOption.js";

export class FileOption extends BaseOption {
    constructor(
        public override alias: string,
        public override description: string,
        app_i18n: Locale,
        public required: boolean,
        public normalize: boolean = true,
        strictCheck: boolean = true,
        public defaultPath: string | undefined = undefined,
        public coerce = coerceFile.bind(null, app_i18n, strictCheck, defaultPath)
    ) {
        const type: YargOptionType = 'string';
        super(type, alias, description);
    }

    public get default(): string | undefined {
        return this.defaultPath ?? undefined;
    }
}