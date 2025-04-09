import { gql } from "@apollo/client";

export const GET_COTAS = gql`
    query GetCotas {
        cotas {
            id
            nome
            numeroCota
            valor
            status
            grupoId
            grupo {
                id
                nome
                administradoraId
            }
            clienteId
            cliente {
                id
                nome
                cpf
                email
            }
        }
    }
`;

export const GET_COTA = gql`
    query GetCota($id: Int!) {
        cota(id: $id) {
            id
            nome
            numeroCota
            valor
            status
            grupoId
            grupo {
                id
                nome
                administradoraId
            }
            clienteId
            cliente {
                id
                nome
                cpf
                email
            }
        }
    }
`;

export const ADD_COTA = gql`
    mutation AddCota($input: CotaInput!) {
        addCota(input: $input) {
            id
            nome
            numeroCota
            valor
            status
            grupoId
            clienteId
        }
    }
`;

export const UPDATE_COTA = gql`
    mutation UpdateCota($id: Int!, $input: CotaInput!) {
        updateCota(id: $id, input: $input) {
            id
            nome
            numeroCota
            valor
            status
            grupoId
            clienteId
        }
    }
`;

export const DELETE_COTA = gql`
    mutation DeleteCota($id: Int!) {
        deleteCota(id: $id)
    }
`;

export const GET_GRUPOS = gql`
    query GetGrupos {
        grupos {
            id
            nome
            administradoraId
        }
    }
`;

export const GET_CLIENTES = gql`
    query GetClientes {
        clientes {
            id
            nome
            cpf
            email
        }
    }
`;
