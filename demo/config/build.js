import { resolve } from "node:path";
import { prerender } from "ziko-server/prerender";

export function build({outDir = 'dist'} = {}) {
    const Target = process.env.TARGET;
    const isClient = Target === 'client';
    const isServer = Target === 'server';
    const isStatic = Target === 'static';

    if (isClient) {
        return {
            build: {
                modulePreload: false,
                outDir: `${outDir}/.client`,
                emptyOutDir: true,
                manifest: true,
                rollupOptions: {
                    input: resolve(process.cwd(), "src/entries/entry-client.js"),
                    output: {
                        entryFileNames: `assets/[name].[hash].js`,
                        chunkFileNames: `assets/[name].[hash].js`,
                        assetFileNames: `assets/[name].[hash].[ext]`,
                    },
                },
            },
        };
    }

    if (isServer) {
        return {
            build: {
                outDir: `${outDir}/.server`,
                ssr: resolve(process.cwd(), "src/entries/entry-server.js"),
                copyPublicDir: false,
            },
        };
    }

    if (isStatic) {
        prerender({ outDir }).then(
            ()=> console.log("Static prerender completed!")
        )
        return {}; 
    }

    return {};
}
