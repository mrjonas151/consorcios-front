# 🚗 Consórcio Frontend

Sistema de gerenciamento de consórcios implementado como uma aplicação distribuída com arquitetura de **microfrontends**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Fast%20Builds-purple?logo=vite)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple?logo=redux)
![Apollo Client](https://img.shields.io/badge/Apollo%20Client-GraphQL-blueviolet?logo=apollo-graphql)

---

## 🧠 Visão Geral

O **Consórcio Frontend** é uma aplicação moderna e escalável para o gerenciamento de cotas de consórcios, desenvolvida com foco em performance, organização de código e reutilização de componentes. Utiliza **microfrontends** para permitir a evolução independente de diferentes domínios da aplicação.

---

## 🚀 Tecnologias Utilizadas

-   ⚛ **React** — Biblioteca para construção de interfaces reativas
-   🟦 **TypeScript** — Superset do JavaScript com tipagem estática
-   🧰 **Redux Toolkit** — Gerenciamento global de estado
-   🔗 **Apollo Client** — Comunicação com o BFF via GraphQL
-   🧩 **Module Federation** — Implementação de microfrontends com carregamento dinâmico
-   ⚡ **Vite** — Empacotador moderno e super rápido
-   🧭 **React Router** — Gerenciamento de rotas
-   🔔 **React Toastify** — Sistema de notificações
-   🎨 **CSS Modules** — Estilização com escopo local

---

## 🏗 Arquitetura de Microfrontends

O sistema é dividido da seguinte forma:

-   **Host**: Aplicação principal que orquestra e carrega os microfrontends
-   **MFE-Auth**: Responsável pela autenticação do usuário
-   **MFE-Dashboard**: Funcionalidades principais como cotas, grupos e clientes
-   **Shared**: Biblioteca comum com tipos, utilitários e slices do Redux

---

## 📋 Pré-requisitos

-   [Node.js](https://nodejs.org/) **v16+**
-   npm instalado

---

## 🛠 Como Iniciar

```bash
1. Clone o repositório
git clone https://github.com/jonas-frontend/consorcio-frontend.git
cd consorcio-frontend

2. Instale as dependências
npm install

3. Configure o ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
VITE_API_URL=http://bffurl/graphql

4. Inicie a aplicação (host e microfrontends)
npm run dev

```
