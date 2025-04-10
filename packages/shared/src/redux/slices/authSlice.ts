import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: { id: string; name: string; email: string } | null;
    token: string | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: "idle",
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: AuthState["user"]; token: string }>
        ) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = "idle";
            state.error = null;
            localStorage.setItem("authToken", action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("authToken");
        },
        setAuthLoading: (state) => {
            state.status = "loading";
            state.error = null;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout, setAuthLoading, setAuthError } =
    authSlice.actions;

export default authSlice.reducer;
