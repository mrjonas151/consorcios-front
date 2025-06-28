/// <reference types="vite/client" />

declare module "shared/types" {
    export interface Administradora {
        id: number;
        nome: string;
        cnpj: string;
        grupos?: Grupo[];
    }

    export interface Grupo {
        id: number;
        nome: string;
        administradoraId: number;
        administradora?: Administradora;
        cotas?: Cota[];
    }

    export interface Cliente {
        id: number;
        nome: string;
        cpf: string;
        email: string;
        cotas?: Cota[];
    }

    export interface Cota {
        id: number;
        numeroCota: string;
        valor: number;
        status: string;
        grupoId: number;
        grupo: Grupo;
        clienteId?: number;
        cliente?: Cliente;
    }

    export enum CotaStatus {
        DISPONIVEL = "DISPONIVEL",
        RESERVADA = "RESERVADA",
        VENDIDA = "VENDIDA",
        CONTEMPLADA = "CONTEMPLADA",
        CANCELADA = "CANCELADA",
    }

    export interface ApiResponse<T> {
        success: boolean;
        data?: T;
        error?: string;
        message?: string;
    }

    export interface PaginatedResponse<T> {
        items: T[];
        totalCount: number;
        pageIndex: number;
        pageSize: number;
        totalPages: number;
    }
}

declare module "shared/store" {
    import { Store } from "@reduxjs/toolkit";
    export const store: Store;
}

declare module "shared/authSlice" {
    import { Reducer } from "redux";
    export const logout: () => any;
    const authReducer: Reducer;
    export default authReducer;
}

declare module "shared/cotasSlice" {
    import { Reducer } from "redux";
    import { Cota } from "shared/types";

    export function fetchCotas(): any;
    export function fetchCotaById(id: string): any;
    export function createCota(input: any): any;
    export function updateCota(input: any): any;
    export function removeCota(id: string): any;

    export function selectCota(id: string | null): any;
    export function addCotaLocal(cota: Cota): any;
    export function updateCotaLocal(cota: Cota): any;
    export function removeCotaLocal(id: string): any;

    const cotasReducer: Reducer;
    export default cotasReducer;
}

declare module "shared/apolloClient" {
    import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
    export const client: ApolloClient<NormalizedCacheObject>;
}

declare module "shared/store" {
    import { Store } from "@reduxjs/toolkit";
    export const store: RootState;
}
