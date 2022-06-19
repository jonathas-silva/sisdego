package com.jonathas.sisdego.controllers;

import com.jonathas.sisdego.domain.Catador;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.services.CatadorService;
import com.jonathas.sisdego.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/catadores")
public class CatadorController {

    @Autowired
    private CatadorService service;

    @GetMapping
    public ResponseEntity<List<Catador>> listAll(){
        List<Catador> resultado = service.findAll();
        return ResponseEntity.ok().body(resultado);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PutMapping(value = "/{idCatador}")
    public ResponseEntity<Catador> inserirSolicitacao(@PathVariable Long idCatador, @RequestParam Long idSolicitacao){
        Catador created = service.inserirSolicitacao(idSolicitacao, idCatador);
        return ResponseEntity.ok(created);
    }
    //Vamos testar o uso do requestParam, em detrimento do request Body. Neste caso, como não estamos usando um tipo específico
    //aparentemente é a melhor solução

}
