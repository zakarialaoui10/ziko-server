import { join } from 'path';
import { pathToFileURL } from 'url';

export async function importEntryServer({ cwd = process.cwd(), isProduction } = {}) {
    const file = isProduction ? join(cwd, 'dist/.server/entry-server.js') : join(cwd, '.ziko/entry-server.js')
    const FileUrl = pathToFileURL(file).href;
    const module = await import(/* @vite-ignore */ FileUrl);
    return module
}
