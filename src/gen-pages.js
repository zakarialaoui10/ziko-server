// scripts/gen-pages.js
import fg from 'fast-glob';
import fs from 'fs';

const pattern = 'src/pages/**/*.{js,mdz}';
const entries = await fg(pattern, { dot: false });

const output = entries.map(file => {
  const key = '/' + file.replace(/\\/g, '/'); // make keys browser-compatible
  return `  "${key}": () => import("${key}")`;
});

const fileContent = `// This file is auto-generated
export const pages = {
${output.join(',\n')}
};`;

fs.writeFileSync('src/generated-pages.js', fileContent);
console.log("✅ generated-pages.js created");
