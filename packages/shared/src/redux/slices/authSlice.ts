import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "../../api/client";

interface LoginCredentials {
    username: string;
    password: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
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

export const loginUser = createAsyncThunk<
    { user: User; token: string },
    LoginCredentials,
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const LOGIN_MUTATION = gql`
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    access_token
                    user {
                        id
                        username
                        email
                        role
                    }
                }
            }
        `;

        const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
                input: {
                    username: credentials.username,
                    password: credentials.password,
                },
            },
        });

        const result = data.login;

        localStorage.setItem("authToken", result.access_token);

        return {
            user: result.user,
            token: result.access_token,
        };
    } catch (error: any) {
        const errorMessage =
            error.graphQLErrors?.[0]?.message ||
            "Falha na autenticação. Verifique suas credenciais.";
        return rejectWithValue(errorMessage);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User; token: string }>
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
        checkAuthState: (state) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                state.isAuthenticated = true;
                state.token = token;
                state.status = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = "idle";
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            });
    },
});

export const {
    loginSuccess,
    logout,
    setAuthLoading,
    setAuthError,
    checkAuthState,
} = authSlice.actions;

export default authSlice.reducer;
