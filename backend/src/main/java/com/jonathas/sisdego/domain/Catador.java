package com.jonathas.sisdego.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Catador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @OneToMany //não mapeado. Os valores serão inseridos manualmente
    private List<Solicitacao> solicitacoes = new ArrayList<>();

    private String nome;

    public Catador(){

    }

    public Catador(Long id, List<Solicitacao> solicitacoes, String nome) {
        this.id = id;
        this.solicitacoes = solicitacoes;
        this.nome = nome;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Solicitacao> getSolicitacoes() {
        return solicitacoes;
    }

    public void setSolicitacoes(Solicitacao solicitacoes) {
        this.solicitacoes.add(solicitacoes);
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
