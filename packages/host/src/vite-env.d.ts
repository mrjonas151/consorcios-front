/// <reference types="vite/client" />

declare module "shared/store" {
    import { Store } from "@reduxjs/toolkit";
    export const store: Store;
}

declare module "shared/authSlice" {
    import { PayloadAction } from "@reduxjs/toolkit";

    export interface AuthState {
        isAuthenticated: boolean;
        user: { id: string; name: string; email: string } | null;
        token: string | null;
        status: "idle" | "loading" | "failed";
        error: string | null;
    }

    export function loginSuccess(payload: {
        user: { id: string; name: string; email: string };
        token: string;
    }): PayloadAction<any>;

    export function logout(): PayloadAction<any>;
    export function setAuthLoading(): PayloadAction<any>;
    export function setAuthError(error: string): PayloadAction<any>;

    const authReducer: import("redux").Reducer<AuthState>;
    export default authReducer;
}

declare module "auth/App" {
    const App: React.ComponentType;
    export default App;
}

declare module "dashboard/Dashboard" {
    const Dashboard: React.ComponentType;
    export default Dashboard;
}
