import { YargOptionType } from '../../TypeDefs/OptionsTypeDefs.js';
import { BaseOption } from '../BaseOption.js';


export class SimpleArrayOption extends BaseOption {
    constructor(
        public override alias: string,
        public override description: string
    ) {
        const type: YargOptionType = 'array';
        super(type, alias, description);
    }
}