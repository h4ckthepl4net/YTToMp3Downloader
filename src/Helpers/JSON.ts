import {
    InvalidJSON,
    InvalidJSONType,
    JSONStringTooLarge
} from '../Exceptions/JSONExceptions.js';

export default class JSON {
    public static parse(json: string): Object {
        try {
            return JSON.parse(json);
        } catch (exception: unknown) {
            if (exception instanceof SyntaxError) {
                throw new InvalidJSON(exception.message);
            } else if (exception instanceof TypeError) {
                throw new InvalidJSONType(exception.message);
            } else if (exception instanceof RangeError) {
                throw new JSONStringTooLarge(exception.message);
            }
            throw exception;
        }
    }
}