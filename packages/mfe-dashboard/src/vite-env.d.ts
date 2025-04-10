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
        nome: string;
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