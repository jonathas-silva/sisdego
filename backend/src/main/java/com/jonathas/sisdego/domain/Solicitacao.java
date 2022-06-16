package com.jonathas.sisdego.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jonathas.sisdego.domain.enums.EstadoSolicitacao;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Solicitacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario user;

    private String tipo;

    private String descricao;

    private String data;

    private String endereco;

    private String melhor_dia;

    private String melhor_horario;

    //utilizado integer, porém em refatoração futura utilizar Enums
    private EstadoSolicitacao estado;

    public Solicitacao() {

    }

    public Solicitacao(Long id, Usuario user, String tipo, String descricao, String data, String endereco, String melhor_dia, String melhor_horario, EstadoSolicitacao estadoSolicitacao) {
        this.id = id;
        this.user = user;
        this.tipo = tipo;
        this.descricao = descricao;
        this.data = data;
        this.endereco = endereco;
        this.melhor_dia = melhor_dia;
        this.melhor_horario = melhor_horario;
        this.estado = estadoSolicitacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public String getEstado() {
        return estado.getDescricao();
    }

    public void setEstado(EstadoSolicitacao estado) {
        this.estado = estado;
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

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
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
