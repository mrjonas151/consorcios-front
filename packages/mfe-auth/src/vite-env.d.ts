/// <reference types="vite/client" />

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
    }): PayloadAction<{
        user: { id: string; name: string; email: string };
        token: string;
    }>;

    export function logout(): PayloadAction<void>;
    export function setAuthLoading(): PayloadAction<void>;
    export function setAuthError(error: string): PayloadAction<string>;

    const authReducer: import("redux").Reducer<AuthState>;
    export default authReducer;
}

declare module "shared/store" {
    import { Store } from "@reduxjs/toolkit";

    interface RootState {
        auth: {
            isAuthenticated: boolean;
            user: { id: string; name: string; email: string } | null;
            token: string | null;
            status: "idle" | "loading" | "failed";
            error: string | null;
        };
        cotas: {
            items: any[];
            selectedCota: any | null;
            status: "idle" | "loading" | "succeeded" | "failed";
            error: string | null;
        };
    }

    export const store: Store<RootState>;
}
