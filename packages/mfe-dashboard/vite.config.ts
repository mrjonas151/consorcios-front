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
                "./CotasList": "./src/components/CotasList/CotasList.tsx",
                "./CotasForm": "./src/components/CotasForm/CotasForm.tsx",
                "./CotasDetails":
                    "./src/components/CotasDetails/CotaDetails.tsx",
            },
            remotes: {
                shared: "http://localhost:5001/assets/remoteEntry.js",
            },
            shared: [
                "react",
                "react-dom",
                "react-router-dom",
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
    },
});
