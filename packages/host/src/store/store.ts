import { configureStore, combineReducers } from "@reduxjs/toolkit";

let storeInstance: ReturnType<typeof configureStore> | null = null;

export async function initializeStore() {
    if (storeInstance) return storeInstance;

    try {
        const authModule = await import("shared/authSlice");
        const cotasModule = await import("shared/cotasSlice");

        const authReducer = authModule.default;
        const cotasReducer = cotasModule.default;

        const rootReducer = combineReducers({
            auth: authReducer,
            cotas: cotasReducer,
        });

        storeInstance = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),
            devTools: process.env.NODE_ENV !== "production",
        });

        return storeInstance;
    } catch (error) {
        console.error("Falha ao inicializar a store:", error);
        throw error;
    }
}

export type RootState = {
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
};

export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
