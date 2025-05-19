import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    server: {
        // port: 3000, we can change the port of the application by default is http://localhost:5173/
        proxy: {
            "/api": {
                target: "http://localhost:8000", // Proxy requests to the API server running on localhost:8000
                changeOrigin: true, // Change the origin of the request to the target server
                secure: false, // Disable SSL verification for development purposes
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
