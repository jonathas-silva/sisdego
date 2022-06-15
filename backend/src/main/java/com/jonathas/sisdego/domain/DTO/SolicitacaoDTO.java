package com.jonathas.sisdego.domain.DTO;

import com.jonathas.sisdego.domain.Usuario;

public class SolicitacaoDTO {

    private Long user; //id do usuário

    private String tipo;

    private String descricao;

    private String data;

    private String endereco;

    private String melhor_dia;

    private String melhor_horario;

    public SolicitacaoDTO(){

    }

    public SolicitacaoDTO(Long user, String tipo, String descricao, String data, String endereco, String melhor_dia, String melhor_horario) {
        this.user = user;
        this.tipo = tipo;
        this.descricao = descricao;
        this.data = data;
        this.endereco = endereco;
        this.melhor_dia = melhor_dia;
        this.melhor_horario = melhor_horario;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getMelhor_dia() {
        return melhor_dia;
    }

    public void setMelhor_dia(String melhor_dia) {
        this.melhor_dia = melhor_dia;
    }

    public String getMelhor_horario() {
        return melhor_horario;
    }

    public void setMelhor_horario(String melhor_horario) {
        this.melhor_horario = melhor_horario;
    }
}


