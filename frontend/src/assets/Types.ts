export type Usuario = {
    id: number;
    nome: string;
    cpf: string;
}

export type Solicitacao = {
    id: number;
    usuario: Usuario;
    tipo: string;
    descricao: string;
    horario: string;
    endereco: string;
}
