import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "dashboard",
            filename: "remoteEntry.js",
            exposes: {
                "./Dashboard": "./src/pages/Dashboard/Dashboard.tsx",
            },
            remotes: {
                shared: "http://localhost:5001/assets/remoteEntry.js",
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
        target: "esnext",
        modulePreload: false,
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 5003,
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        strictPort: true,
    },
    preview: {
        port: 5003,
        strictPort: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
});
