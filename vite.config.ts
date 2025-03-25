import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "auth-app",
            filename: "remoteEntry.js",
            exposes: {
                "./LoginForm": "./src/components/LoginForm/LoginForm.tsx",
                "./SignIn": "./src/pages/SignIn/SignIn.tsx",
            },
            shared: ["react", "react-dom", "react-toastify"],
        }),
    ],
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
