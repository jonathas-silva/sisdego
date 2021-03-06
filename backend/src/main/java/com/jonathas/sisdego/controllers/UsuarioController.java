package com.jonathas.sisdego.controllers;

import com.jonathas.sisdego.data.DetalheUsuarioData;
import com.jonathas.sisdego.domain.DTO.SolicitacaoDTO;
import com.jonathas.sisdego.domain.Solicitacao;
import com.jonathas.sisdego.domain.Usuario;
import com.jonathas.sisdego.security.Util;
import com.jonathas.sisdego.services.SolicitacaoService;
import com.jonathas.sisdego.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.StringTokenizer;


@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    Util util;

    @Autowired
    private UsuarioService service;


    @GetMapping
    public ResponseEntity<List<Usuario>> listAll() {
        List<Usuario> resultado = service.findAll();
        return ResponseEntity.ok().body(resultado);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Usuario> adicionarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(service.salvarUsuario(usuario));
    }

    @GetMapping("/validarSenha")
    public ResponseEntity<Boolean> validacao(@RequestParam String email, @RequestParam String senha) {
        return service.validarSenha(email, senha);
    }

    @GetMapping("/getEmail")
    public Usuario getEmail(@RequestParam String email) {
        return service.findByEmail(email);

    }

}



