export class InvalidJSON extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidJSONType extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class JSONStringTooLarge extends Error {
    constructor(message: string) {
        super(message);
    }
}