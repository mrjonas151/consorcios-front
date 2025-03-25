import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string;
    email?: string;
}

interface AuthState {
    user: User;
    token: string;
    isAuthenticated: boolean;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    user: { username: "" },
    token: "",
    isAuthenticated: false,
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = "";
        },
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = { username: "" };
            state.token = "";
            state.isAuthenticated = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const loginUser =
    (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(loginStart());

            //chamar api aqui
            if (!username || !password) {
                throw new Error("Username and password are required");
            }

            //simulando demora da minha api do consorcio
            await new Promise((resolve) => setTimeout(resolve, 500));

            //mock no front por enquanto até eu arrumar o back
            const user = { username };
            const token =
                "mock-jwt-token-" + Math.random().toString(36).substring(2);

            //salvando no localstorage pra permanecer
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            dispatch(loginSuccess({ user, token }));
            return { success: true };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Login failed";
            dispatch(loginFailure(errorMessage));
            return { success: false, error: errorMessage };
        }
    };
