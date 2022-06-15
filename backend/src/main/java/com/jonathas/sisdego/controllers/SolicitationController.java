package com.jonathas.sisdego.controllers;

import com.jonathas.sisdego.domain.DTO.SolicitacaoDTO;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.services.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(value = "/solicitacoes")
public class SolicitationController {

    @Autowired
    private SolicitacaoService service;

    @GetMapping
    public ResponseEntity<List<Solicitacao>> listAll(){
        List<Solicitacao> resultado = service.findAll();
        return ResponseEntity.ok().body(resultado);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Solicitacao> saveSolicitation(@RequestBody SolicitacaoDTO solicitao){
        Solicitacao created =  service.update(solicitao);

        //retornando o objeto criado, inclusive com o seu devido id autogerado
        return ResponseEntity.ok().body(created);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteSolicitation(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
