import { DirectoryOption } from "./DirectoryOption.js";

export class RequiredDirectoryOption extends DirectoryOption {
    public required: boolean = true;
    constructor(...args: ConstructorParameters<typeof DirectoryOption>) {
        super(...args);
    }
}