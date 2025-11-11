import { ManifestParser } from "../server-only-utils/manifest-parser.js"
export const injectEntryClient = ({outDir, mode}) => {
    const Manifest = new ManifestParser(`${outDir}/.client/.vite/manifest.json`)
    return {
        name: "inject-entry-client",
        transformIndexHtml() {
        const src = mode === "development" ? '/.ziko/entry-client.js' : Manifest.EntryClientFile
        return {
            tags: [
            {
                tag: "script",
                attrs: { src, type : 'module', 'data-injected': 'true' },
                injectTo: "head",
            },
            ],
        };
        },
    }
}