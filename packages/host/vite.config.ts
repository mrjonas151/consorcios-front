import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host",
            remotes: {
                shared: "http://localhost:5001/assets/remoteEntry.js",
                auth: "http://localhost:5002/assets/remoteEntry.js",
                dashboard: "http://localhost:5003/assets/remoteEntry.js",
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
        port: 5000,
        cors: true,
        strictPort: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    optimizeDeps: {
        include: ["react-icons"],
    },
});
