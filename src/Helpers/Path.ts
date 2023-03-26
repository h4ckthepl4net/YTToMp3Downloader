import path from 'path';
import url from 'url';

export default class Path {
    public static urlToFilePath(urlToTransform: string): string {
        return url.fileURLToPath(urlToTransform);
    }

    public static dirname = path.dirname;

    public static dirnameFromFileUrl(urlToTransform: string): string {
        return Path.dirname(Path.urlToFilePath(urlToTransform));
    }

    public static join = path.join;

    public static resolve = path.resolve;

    public static sep = path.sep;
}