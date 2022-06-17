package com.jonathas.sisdego.domain.enums;

public enum EstadoSolicitacao {
    AGUARDANDO(0, "Aguardando"),
    EM_FILA(1, "Em fila de coleta"),
    COLETADO(2, "Finalizado");

    private Integer codigo;
    private String descricao;

    private EstadoSolicitacao(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    //percorre a lista dos valores possíveis, e retorna o enum correspondente
    @Deprecated
    public static EstadoSolicitacao toEnum(Integer code) {
        for (EstadoSolicitacao value : EstadoSolicitacao.values()) {
            if (code == value.getCodigo()) {
                return value;
            }
        }
        throw new IllegalArgumentException("Código de solicitação inválido!");
    }
}
