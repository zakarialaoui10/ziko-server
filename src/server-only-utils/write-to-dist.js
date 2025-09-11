import {mkdir, writeFile} from 'fs/promises';
import {join, dirname} from 'path';

export async function writeToDist({route, html, outDir = 'dist/static'}={}) {
    const out = `
<!doctype html>
<html>
<head>
    <script type="module" src="assets/entry-client-CidUuTlV.js"></script>
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