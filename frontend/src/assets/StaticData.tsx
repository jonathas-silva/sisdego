import { Solicitacao, Usuario } from "./Types";


export const hercule: Usuario = {
    nome: "Hercule Poirot",
    cpf: "5464832179654",
    id: 1
}

export const pedido1: Solicitacao = {
    tipo: "Entulho",
    descricao: "Entulho de material de construção sobre a calçada",
    data: "28-05-2022 18:22",
    endereco: "Av. Presidente Juscelino Kubitscheck, 1.909",
    id: 1
}

export const pedido2: Solicitacao = {
    tipo: "Reciclável",
    descricao: "Garrafas de vidro em caixa de papelão",
    data: "28-05-2022 18:23",
    id: 2,
    endereco: "Av. Conde Francisco Matarazzo, 100"
}

export const pedido3: Solicitacao = {
    tipo: "Sofá",
    descricao: "Sofá velho em boas condições",
    data: "28-05-2022 22:12",
    id: 3,
    endereco: "Av. Conde Francisco Matarazzo, 150"
}