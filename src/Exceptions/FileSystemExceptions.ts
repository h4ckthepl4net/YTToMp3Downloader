export class PathNotExistsException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PathIsNotDirectoryException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PathIsDirectoryException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PermissionDeniedException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidArgumentException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class TooManySysOpenFilesException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class TooManyOpenFilesException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class IOException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PathTooLongException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class FileAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class FileNameTooLongException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ReadOnlyFSException extends Error {
    constructor(message: string) {
        super(message);
    }
}