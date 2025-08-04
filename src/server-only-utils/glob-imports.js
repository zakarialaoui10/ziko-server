import fg from 'fast-glob';
import path from 'path';
import { pathToFileURL } from 'url';

export async function globImports(pattern = 'src/pages/**/*.{js,ts,jsx,tsx,mdz}', { cwd = process.cwd() } = {}) {
  const files = await fg(pattern, { cwd });

  const modules = {};

  for (const file of files) {
    const absPath = path.resolve(cwd, file);
    const fileUrl = pathToFileURL(absPath).href;

    const key = './' + file.replace(/\\/g, '/');
    modules[key] = () => import(fileUrl);
  }

  return modules;
}
