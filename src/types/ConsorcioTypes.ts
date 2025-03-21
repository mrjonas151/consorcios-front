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
    clienteId?: number | null;
    cliente?: Cliente | null;
}

export interface LoginModel {
    username: string;
    password: string;
}

export interface CotaInput {
    numeroCota: string;
    valor: number;
    status: string;
    grupoId: number;
    clienteId?: number | null;
}

export interface GrupoInput {
    nome: string;
    administradoraId: number;
}

export interface ClienteInput {
    nome: string;
    cpf: string;
    email: string;
}

export interface AdministradoraInput {
    nome: string;
    cnpj: string;
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
