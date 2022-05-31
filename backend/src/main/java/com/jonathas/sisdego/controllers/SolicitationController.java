package com.jonathas.sisdego.controllers;

import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.services.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/solicitacoes")
public class SolicitationController {

    @Autowired
    private SolicitacaoService service;


    @GetMapping(value = "/{id}")
    public Solicitacao findById(@PathVariable Long id){
        return service.findById(id);
    }
}
