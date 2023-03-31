import fs from 'fs';
import { FileSystemErrors } from '../Constants/FileSystemErrors.js';
import {
    PathNotExistsException,
    PathIsDirectoryException,
    PermissionDeniedException,
    InvalidArgumentException,
    TooManySysOpenFilesException,
    TooManyOpenFilesException,
    IOException,
    PathTooLongException,
    FileAlreadyExistsException,
    FileNameTooLongException,
    PathIsNotDirectoryException,
    ReadOnlyFSException,
    FileContentTooBigToBeWrittenException,
    ResourceAlreadyBusyException,
} from '../Exceptions/FileSystemExceptions.js';
import Path from './Path.js';

export default class FileSystem {
    public static readFileSync(...args: Parameters<typeof fs.readFileSync>): ReturnType<typeof fs.readFileSync> {

        try {

            return fs.readFileSync(...args);

        } catch (exception: unknown) {

            let exceptionToRethrow = exception as NodeJS.ErrnoException;

            switch ((exception as NodeJS.ErrnoException).code) {

                case FileSystemErrors.FILE_NOT_FOUND:
                    exceptionToRethrow = new PathNotExistsException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FILE_IS_DIR:
                    exceptionToRethrow = new PathIsDirectoryException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.PERMISSION_DENIED:
                    exceptionToRethrow = new PermissionDeniedException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.INVALID_ARGUMENT:
                    exceptionToRethrow = new InvalidArgumentException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.TOO_MANY_SYS_OPEN_FILES:
                    exceptionToRethrow = new TooManySysOpenFilesException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.TOO_MANY_OPEN_FILES:
                    exceptionToRethrow = new TooManyOpenFilesException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.IO_ERROR:
                    exceptionToRethrow = new IOException(exceptionToRethrow.message);
                    break;
            }

            throw exceptionToRethrow;
        }
    }

    public static existsSync(...args: Parameters<typeof fs.existsSync>): ReturnType<typeof fs.existsSync> {
        try {
            return fs.existsSync(...args);
        } catch (exception: unknown) {
            if (exception instanceof RangeError) {
                throw new PathTooLongException(exception.message);
            } else if (exception instanceof TypeError) {
                throw new InvalidArgumentException(exception.message);
            }
            throw exception;
        }
    }

    public static statSync(...args: Parameters<typeof fs.statSync>): ReturnType<typeof fs.statSync> {
        try {
            return fs.statSync(...args);
        } catch (exception: unknown) {
            if (exception instanceof RangeError) {
                throw new PathTooLongException(exception.message);
            } else if (exception instanceof TypeError) {
                throw new InvalidArgumentException(exception.message);
            }
            throw exception;
        }
    }

    public static mkdirSync(...args: Parameters<typeof fs.mkdirSync>): ReturnType<typeof fs.mkdirSync> {
        try {

            return fs.mkdirSync(...args);

        } catch (exception: unknown) {

            let exceptionToRethrow = exception as NodeJS.ErrnoException;

            switch ((exception as NodeJS.ErrnoException).code) {
                case FileSystemErrors.PERMISSION_DENIED:
                    exceptionToRethrow = new PermissionDeniedException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FILE_OR_DIR_ALREADY_EXISTS:
                    exceptionToRethrow = new FileAlreadyExistsException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FILENAME_TOO_LONG:
                    exceptionToRethrow = new FileNameTooLongException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FILE_NOT_FOUND:
                    exceptionToRethrow = new PathNotExistsException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FILE_IS_NOT_DIR:
                    exceptionToRethrow = new PathIsNotDirectoryException(exceptionToRethrow.message);
                    break;
                case FileSystemErrors.FS_IS_READ_ONLY:
                    exceptionToRethrow = new ReadOnlyFSException(exceptionToRethrow.message);
                    break;
            }

            throw exceptionToRethrow;
        }
    }

    public static writeFileSync(...args: Parameters<typeof fs.writeFileSync>): ReturnType<typeof fs.writeFileSync> {
        try {

            return fs.writeFileSync(...args);

        } catch (exception: unknown) {

            let exceptionToRethrow = exception as NodeJS.ErrnoException;

            if (exception instanceof RangeError) {
                exceptionToRethrow = new FileContentTooBigToBeWrittenException(exception.message);
            } else if (exception instanceof TypeError) {
                exceptionToRethrow = new InvalidArgumentException(exception.message);
            } else {
                switch ((exception as NodeJS.ErrnoException).code) {
                    case FileSystemErrors.PERMISSION_DENIED:
                        exceptionToRethrow = new PermissionDeniedException(exceptionToRethrow.message);
                        break;
                    case FileSystemErrors.RESOURCE_BUSY:
                        exceptionToRethrow = new ResourceAlreadyBusyException(exceptionToRethrow.message);
                        break;
                    case FileSystemErrors.FILENAME_TOO_LONG:
                        exceptionToRethrow = new FileNameTooLongException(exceptionToRethrow.message);
                        break;
                    case FileSystemErrors.IO_ERROR:
                        exceptionToRethrow = new IOException(exceptionToRethrow.message);
                        break;
                    case FileSystemErrors.FILE_IS_DIR:
                        exceptionToRethrow = new PathIsDirectoryException(exceptionToRethrow.message);
                        break;
                    case FileSystemErrors.FS_IS_READ_ONLY:
                        exceptionToRethrow = new ReadOnlyFSException(exceptionToRethrow.message);
                        break;
                }
            }

            throw exceptionToRethrow;
        }
    }

    public static createFileRecursively(filePath: string): string {
        filePath = Path.resolve(filePath);
        if (FileSystem.existsSync(filePath)) {
            return filePath;
        }
        const dir = Path.dirname(filePath);
        FileSystem.mkdirSync(dir, {recursive: true});
        FileSystem.writeFileSync(filePath, '');
        return filePath;
    }
}