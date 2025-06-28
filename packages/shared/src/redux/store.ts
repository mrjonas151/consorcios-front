import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cotasReducer from "./slices/cotasSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cotas: cotasReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const initializeStore = () => store;

export default { store, initializeStore };
