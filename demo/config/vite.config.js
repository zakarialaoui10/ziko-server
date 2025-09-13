import { defineConfig } from "vite";
import { build } from "ziko-server/build";

export default defineConfig(() => {
    return build();
});
