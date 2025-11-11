import { defineConfig } from "vite";
import { 
  vite_setup,
  injectEntryClient
} from "ziko-server/vite";

export default defineConfig(({ command, mode }) => {
  const outDir = 'dist'
  const baseConfig = vite_setup({
    outDir: "dist",
    mode
  });
  // // merge plugin into the base config
  baseConfig.plugins = baseConfig.plugins || [];
  baseConfig.plugins.push(injectEntryClient({outDir, mode}));

  return baseConfig;
});
