export class NotADirectory extends Error {
    constructor(arg: string, path: string) {
        super(`[Argument error on ${arg}]: Path ${path} is not a directory.`);
    }
}