import {readFileSync} from 'fs';
import {join} from 'path';

export class ManifestParser {
    constructor(relative_path){
        this.#init(relative_path)
    }
    #init(relative_path){
        const file = join(process.cwd(), relative_path);
        this.manifest = JSON.parse(readFileSync(file, 'utf-8'))
    }
    get EntryClientFile(){
        return this.manifest['src/entry-client.js'].file
    }
    get files(){
        return this.manifest
    }
}

const manifest = new ManifestParser('./dist/client/.vite/manifest.json')
console.log(manifest.EntryClientFile)
