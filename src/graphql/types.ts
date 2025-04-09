export interface Grupo {
    id: number;
    nome: string;
    administradoraId: number;
}

export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
}

export interface Cota {
    id: number;
    nome: string;
    numeroCota: string;
    valor: number;
    status: string;
    grupoId: number;
    grupo: Grupo;
    clienteId?: number | null;
    cliente?: Cliente | null;
}
