import { defineConfig as defineViteConfig } from "vite";
import { vite_setup } from "../vite/index.js";
export function defineConfig({ outDir = "dist" } = {}) {
  return defineViteConfig(({ command, mode }) => {
    const base_config = vite_setup({
      outDir,
      mode,
    });
    base_config.plugins = base_config.plugins || [];
    return base_config;
  });
}
