import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Cota {
    id: string;
    consorcioId: string;
    numeroCota: string;
    valor: number;
    status: string;
    dataCriacao?: string;
    clienteId?: string | null;
}

interface CotasState {
    items: Cota[];
    selectedCota: Cota | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CotasState = {
    items: [],
    selectedCota: null,
    status: "idle",
    error: null,
};

//TODO A URL do fetch aqui é apenas um placeholder. Chamar aqui o BFF quando estiver pronto depois.
export const fetchCotas = createAsyncThunk<
    Cota[],
    void,
    { rejectValue: string }
>("cotas/fetchCotas", async (_, { rejectWithValue }) => {
    try {
        //TODO Remover cotas mockadas e depois fazer a chamada real para o meu BFF GraphQL:
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockCotas: Cota[] = [
            {
                id: "1",
                consorcioId: "A",
                numeroCota: "100",
                valor: 50000,
                status: "Ativa",
                clienteId: "C1",
            },
            {
                id: "2",
                consorcioId: "B",
                numeroCota: "200",
                valor: 75000,
                status: "Contemplada",
                clienteId: "C2",
            },
        ];
        return mockCotas;
    } catch (error: any) {
        return rejectWithValue(
            error.message || "Erro desconhecido ao buscar cotas"
        );
    }
});

export const cotasSlice = createSlice({
    name: "cotas",
    initialState,
    reducers: {
        selectCota: (state, action: PayloadAction<string | null>) => {
            if (action.payload === null) {
                state.selectedCota = null;
            } else {
                state.selectedCota =
                    state.items.find((c) => c.id === action.payload) || null;
            }
        },

        addCotaLocal: (state, action: PayloadAction<Cota>) => {
            state.items.push(action.payload);
        },
        updateCotaLocal: (state, action: PayloadAction<Cota>) => {
            const index = state.items.findIndex(
                (c) => c.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeCotaLocal: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((c) => c.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCotas.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                fetchCotas.fulfilled,
                (state, action: PayloadAction<Cota[]>) => {
                    state.status = "succeeded";
                    state.items = action.payload;
                }
            )
            .addCase(fetchCotas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Falha ao buscar cotas";
            });
    },
});

export const { selectCota, addCotaLocal, updateCotaLocal, removeCotaLocal } =
    cotasSlice.actions;

export default cotasSlice.reducer;
