export type Usuario = {
    id: number;
    nome: string;
    email: string;
}

export type UsuarioDTO = {
    id: number;
    solicitacoes: SolicitacaoDTO[];
    nome: string;
    email: string;
}

export type Solicitacao = {
    id: number;
    user: Usuario;
    tipo: string;
    descricao: string;
    data: string;
    endereco: string;
    melhor_dia?: string;
    melhor_horario?: string;
}

export type SolicitacaoDTO = {
    id: number; //passar apenas o número da id do usuário
    tipo: string;
    descricao: string;
    data: string;
    endereco: string;
    melhor_dia?: string;
    melhor_horario?: string;
    estado?: number;
}

export type CatadorDTO = {
    id: number;
    solicitacoes: SolicitacaoDTO[];
    nome: string;
}