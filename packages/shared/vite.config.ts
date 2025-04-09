import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "shared",
            filename: "remoteEntry.js",
            exposes: {
                "./authSlice": "./src/redux/slices/authSlice.ts",
                "./cotasSlice": "./src/redux/slices/cotasSlice.ts",
                "./store": "./src/redux/store.ts",
                "./types": "./src/types/index.ts",
            },
            shared: [
                "react",
                "react-dom",
                "@reduxjs/toolkit",
                "react-redux",
                "react-toastify",
            ],
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
        outDir: "dist",
        assetsDir: "assets",
    },
    server: {
        port: 5001,
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
});
