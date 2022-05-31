package com.jonathas.sisdego.services;

import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.repositories.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository repository;


    @Transactional(readOnly = true)
    public Solicitacao findById(Long id) {
        Solicitacao resultado = repository.findById(id).get();
        return resultado;
    }
}
