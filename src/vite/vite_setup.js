import { resolve } from 'path'
import { injectEntryClient } from './entry-client-plugin.js';
export function vite_setup({outDir = 'dist', plugins, mode} = {}){
    // const all_plugins = [
    //     injectEntryClient({mode, outDir}),
    //     ...plugins
    // ]
    const Target = process.env.TARGET;
    const isClient = (Target === 'client')
    const isServer = (Target === 'server')
    if(isClient){
        return {
            build : {
                modulePreload: false,
                outDir : `${outDir}/.client`, 
                emptyOutDir: true,
                manifest: true, 
                rollupOptions: {
                    input: {
                     main :  resolve(process.cwd(), ".ziko/entry-client.js"),
                     index : resolve(process.cwd(), 'index.html')
                    },
                    output: {
                        entryFileNames: `assets/[name].[hash].js`,
                        chunkFileNames: `assets/[name].[hash].js`,
                        assetFileNames: `assets/[name].[hash].[ext]`,
                    },
                },
            }
        }
    }
    if(isServer){
        return {
            build : {
                outDir : `${outDir}/.server`,
                ssr :  resolve(process.cwd(), ".ziko/entry-server.js"),
                copyPublicDir: false,
            }
        }        
    }
    return {}
}