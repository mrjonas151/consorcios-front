import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client } from "../../api/client";

export interface Cota {
    id: string;
    numeroCota: string;
    valor: number;
    status: string;
    grupoId: string;
    clienteId: string | number | null;
    grupo?: {
        id: string | number;
        nome: string;
    };
    cliente?: {
        id: string | number;
        nome: string;
        cpf: string;
    } | null;
}

interface CreateCotaInput {
    numeroCota: string;
    valor: number;
    status: string;
    grupoId: string;
    clienteId: string | null;
}

interface UpdateCotaInput extends CreateCotaInput {
    id: string;
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

const GET_COTAS = gql`
    query {
        cotas {
            id
            numeroCota
            valor
            status
            grupoId
            clienteId
        }
    }
`;

const GET_COTA_BY_ID = gql`
    query GetCotaById($id: ID!) {
        cota(id: $id) {
            id
            numeroCota
            valor
            status
            grupoId
            grupo {
                id
                nome
            }
            clienteId
            cliente {
                id
                nome
                cpf
            }
        }
    }
`;

const CREATE_COTA = gql`
    mutation CreateCota($input: CreateCotaInput!) {
        createCota(input: $input) {
            id
            numeroCota
            valor
            status
            grupoId
            clienteId
            grupo {
                id
                nome
            }
        }
    }
`;

const UPDATE_COTA = gql`
    mutation UpdateCota($input: UpdateCotaInput!) {
        updateCota(input: $input) {
            id
            numeroCota
            valor
            status
            grupoId
            clienteId
        }
    }
`;

const REMOVE_COTA = gql`
    mutation RemoveCota($id: ID!) {
        removeCota(id: $id)
    }
`;

export const fetchCotas = createAsyncThunk<
    Cota[],
    void,
    { rejectValue: string }
>("cotas/fetchCotas", async (_, { rejectWithValue }) => {
    try {
        const { data } = await client.query({
            query: GET_COTAS,
            fetchPolicy: "network-only",
        });
        return data.cotas;
    } catch (error: any) {
        return rejectWithValue(
            error.message || "Erro ao buscar cotas do servidor"
        );
    }
});

export const fetchCotaById = createAsyncThunk<
    Cota,
    string,
    { rejectValue: string }
>("cotas/fetchCotaById", async (id, { rejectWithValue }) => {
    try {
        const { data } = await client.query({
            query: GET_COTA_BY_ID,
            variables: { id },
            fetchPolicy: "network-only",
        });
        return data.cota;
    } catch (error: any) {
        return rejectWithValue(error.message || `Erro ao buscar a cota ${id}`);
    }
});

export const createCota = createAsyncThunk<
    Cota,
    CreateCotaInput,
    { rejectValue: string }
>("cotas/createCota", async (input, { rejectWithValue }) => {
    try {
        if (!input.numeroCota) {
            return rejectWithValue("Número da cota é obrigatório");
        }

        const preparedInput = {
            numeroCota: input.numeroCota,
            valor: Number(input.valor || 0),
            status: input.status || "DISPONIVEL",
            grupoId: Number(input.grupoId || 0),
            clienteId: input.clienteId ? Number(input.clienteId) : null,
        };

        const { data } = await client.mutate({
            mutation: CREATE_COTA,
            variables: { input: preparedInput },
            refetchQueries: [{ query: GET_COTAS }],
        });
        return data.createCota;
    } catch (error: any) {
        console.error("Erro detalhado:", error);

        if (error.graphQLErrors) {
            for (const graphQLError of error.graphQLErrors) {
                console.error("GraphQL error:", graphQLError);

                const validationMessage = graphQLError.message || "";
                if (validationMessage.includes("numeroCota")) {
                    return rejectWithValue("Número da cota é obrigatório");
                }
            }
        }

        return rejectWithValue(error.message || "Erro ao criar cota");
    }
});

export const updateCota = createAsyncThunk<
    Cota,
    UpdateCotaInput,
    { rejectValue: string }
>("cotas/updateCota", async (input, { rejectWithValue }) => {
    try {
        const { data } = await client.mutate({
            mutation: UPDATE_COTA,
            variables: { input },
            refetchQueries: [{ query: GET_COTAS }],
        });
        return data.updateCota;
    } catch (error: any) {
        return rejectWithValue(
            error.message || `Erro ao atualizar cota ${input.id}`
        );
    }
});

export const removeCota = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("cotas/removeCota", async (id, { rejectWithValue }) => {
    try {
        const { data } = await client.mutate({
            mutation: REMOVE_COTA,
            variables: { id },
            refetchQueries: [{ query: GET_COTAS }],
        });

        if (data.removeCota) {
            return id;
        } else {
            return rejectWithValue(`Não foi possível remover a cota ${id}`);
        }
    } catch (error: any) {
        return rejectWithValue(error.message || `Erro ao remover cota ${id}`);
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
            .addCase(fetchCotas.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCotas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Falha ao buscar cotas";
            })

            .addCase(fetchCotaById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCotaById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedCota = action.payload;

                const index = state.items.findIndex(
                    (c) => c.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(fetchCotaById.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.payload ?? "Falha ao buscar cota específica";
            })

            .addCase(createCota.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCota.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createCota.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Falha ao criar cota";
            })

            .addCase(updateCota.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCota.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.items.findIndex(
                    (c) => c.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.selectedCota?.id === action.payload.id) {
                    state.selectedCota = action.payload;
                }
            })
            .addCase(updateCota.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Falha ao atualizar cota";
            })

            .addCase(removeCota.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(removeCota.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(
                    (c) => c.id !== action.payload
                );
                if (state.selectedCota?.id === action.payload) {
                    state.selectedCota = null;
                }
            })
            .addCase(removeCota.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Falha ao remover cota";
            });
    },
});

export const { selectCota, addCotaLocal, updateCotaLocal, removeCotaLocal } =
    cotasSlice.actions;

export default cotasSlice.reducer;
