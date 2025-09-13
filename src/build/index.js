import { resolve } from 'path'
export function build({outDir = 'dist'} = {}){
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
                     main :  resolve(process.cwd(), "src/entries/entry-client.js"),
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
                ssr :  resolve(process.cwd(), "src/entries/entry-server.js"),
                copyPublicDir: false,
            }
        }        
    }
    return {}
}