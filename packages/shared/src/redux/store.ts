import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cotasReducer from "./slices/cotasSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cotas: cotasReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
