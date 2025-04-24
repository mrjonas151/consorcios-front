/// <reference types="vite/client" />

declare module "shared/store" {
    import { Store } from "@reduxjs/toolkit";
    export const store: Store;
}

declare module "shared/cotasSlice" {
    import { Reducer } from "redux";

    export interface CotasState {
        items: any[];
        selectedCota: any | null;
        status: "idle" | "loading" | "succeeded" | "failed";
        error: string | null;
    }

    export function selectCota(id: string | null): any;
    export function addCotaLocal(cota: any): any;
    export function updateCotaLocal(cota: any): any;
    export function removeCotaLocal(id: string): any;
    export function fetchCotas(): any;

    const cotasReducer: Reducer<CotasState>;
    export default cotasReducer;
}

declare module "shared/authSlice" {
    import { PayloadAction } from "@reduxjs/toolkit";

    export interface User {
        id: string;
        username: string;
        email: string;
        role?: string;
    }

    export interface AuthState {
        isAuthenticated: boolean;
        user: User | null;
        token: string | null;
        status: "idle" | "loading" | "failed";
        error: string | null;
    }

    export function loginSuccess(payload: {
        user: { id: string; name: string; email: string };
        token: string;
    }): PayloadAction<any>;

    export const loginUser: (credentials: {
        username: string;
        password: string;
    }) => any;

    export const logout: () => PayloadAction<void>;
    export const checkAuthState: () => PayloadAction<void>;
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
