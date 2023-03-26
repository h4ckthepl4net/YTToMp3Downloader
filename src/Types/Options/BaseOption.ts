import { YargOptionType } from '../TypeDefs/OptionsTypeDefs.js';

export class BaseOption {
    constructor(
        public type: YargOptionType,
        public alias: string,
        public description: string
    ) { }
}