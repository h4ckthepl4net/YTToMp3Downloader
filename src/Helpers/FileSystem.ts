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
} from '../Exceptions/FileSystemExceptions.js';
import Path from './Path.js';

export default class FileSystem {
    public static readFileSync(
            path: fs.PathOrFileDescriptor,
            options?:
                | {
                    encoding?: BufferEncoding;
                    flag?: string | undefined;
                }
                | BufferEncoding
                | null
                | undefined

        ): Buffer | string {

        try {

            return fs.readFileSync(path, options);

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

    public static existsSync(path: fs.PathLike): Boolean {
        try {
            return fs.existsSync(path);
        } catch (exception: unknown) {
            if (exception instanceof RangeError) {
                throw new PathTooLongException(exception.message);
            } else if (exception instanceof TypeError) {
                throw new InvalidArgumentException(exception.message);
            }
            throw exception;
        }
    }

    public static statSync(path: fs.PathLike): fs.Stats {
        try {
            return fs.statSync(path);
        } catch (exception: unknown) {
            if (exception instanceof RangeError) {
                throw new PathTooLongException(exception.message);
            } else if (exception instanceof TypeError) {
                throw new InvalidArgumentException(exception.message);
            }
            throw exception;
        }
    }

    public static mkdirSync(
        path: fs.PathLike,
        options?: fs.MakeDirectoryOptions | number | null | undefined
    ): string | undefined {
        try {

            return fs.mkdirSync(path, options);

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

    public static createFolderStructure(folderPath: string): void {
        const folders = folderPath.split(Path.sep);
        let currentPath = '';

        for (let i = 0; i < folders.length; i++) {
            currentPath = Path.join(currentPath, folders[i]);
            if (!FileSystem.existsSync(currentPath)) {
                FileSystem.mkdirSync(currentPath);
            }
        }
    }
}