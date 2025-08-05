import {mkdir, writeFile} from 'fs/promises';
import {join, dirname} from 'path';

export async function writeToDist({route, html, outDir = 'dist'}={}) {
    const out = `
    <!doctype html>
    <html>
    <head>
    </head>
    <body>
    ${html}
    </body>
    </html>
    `
    const filePath = join(outDir, route === '/' ? '' : route, 'index.html');
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, out, 'utf8');
    console.log(`✔️ Saved ${route} → ${filePath}`);
}