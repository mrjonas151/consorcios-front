/// <reference types="vite/client" />

declare module "shared/authSlice" {
    import { PayloadAction } from "@reduxjs/toolkit";

    export interface User {
        id: string;
        username: string;
        email: string;
        role: string;
    }

    export interface AuthState {
        isAuthenticated: boolean;
        user: User | null;
        token: string | null;
        status: "idle" | "loading" | "failed";
        error: string | null;
    }

    export function loginUser(credentials: {
        username: string;
        password: string;
    }): any;
    export function loginSuccess(payload: {
        user: User;
        token: string;
    }): PayloadAction<{
        user: User;
        token: string;
    }>;

    export function logout(): PayloadAction<void>;
    export function setAuthLoading(): PayloadAction<void>;
    export function setAuthError(error: string): PayloadAction<string>;
    export function checkAuthState(): PayloadAction<void>;

    const authReducer: import("redux").Reducer<AuthState>;
    export default authReducer;
}

declare module "@reduxjs/toolkit" {
    export function unwrapResult<T>(action: any): T;
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
