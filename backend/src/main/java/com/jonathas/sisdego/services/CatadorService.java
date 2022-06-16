package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.Catador;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.repositories.CatadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CatadorService {

    @Autowired
    private CatadorRepository repository;

    @Transactional(readOnly = true)
    public Catador findById(Long id) {
        Catador resultado = repository.findById(id).get();
        return resultado;
    }

    public List<Catador> findAll(){
        List<Catador> resultado =  repository.findAll();
        return resultado;
    }

    public Catador inserirSolicitacao(Solicitacao solicitacao, Long id) {
        Catador catador = repository.findById(id).get();
        catador.setSolicitacoes(solicitacao); //adicionando uma solicitação à lista
        return repository.save(catador);

    }
}
