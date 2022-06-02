package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository repository;


    @Transactional(readOnly = true)
    public Solicitacao findById(Long id) {
        Solicitacao resultado = repository.findById(id).get();
        return resultado;
    }

    public List<Solicitacao> findAll(){
        List<Solicitacao> resultado =  repository.findAll();
        return resultado;
    }

    public Solicitacao update(Solicitacao solicitao) {
        //assumindo que vamos receber o body sem o id
        return repository.save(solicitao);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
