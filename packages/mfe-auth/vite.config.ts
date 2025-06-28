import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App.tsx",
                "./SignIn": "./src/pages/SignIn/SignIn.tsx",
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
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 5002,
        cors: true,
        strictPort: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    preview: {
        port: 5002,
        strictPort: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
});
